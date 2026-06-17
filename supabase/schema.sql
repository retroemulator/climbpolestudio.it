-- ─────────────────────────────────────────────────────────────────────────
-- Climb Pole Studio — schema Supabase (Fase 9/10)
-- Esegui nello SQL Editor di Supabase (una volta). Idempotente dove possibile.
--
-- Modello: scheduleSlot (Sanity) → genera class_session concrete → booking.
-- Auth: Supabase magic link. RLS obbligatoria. Capienza atomica via RPC.
-- ─────────────────────────────────────────────────────────────────────────

-- 1) PROFILI ---------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

-- Crea il profilo automaticamente alla registrazione.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name')
  on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2) SESSIONI PRENOTABILI --------------------------------------------------
-- Materializzate dallo schedule Sanity (slot_ref = _id dello scheduleSlot).
create table if not exists public.class_session (
  id uuid primary key default gen_random_uuid(),
  slot_ref text not null,
  discipline text,
  title text not null,
  level text,
  starts_at timestamptz not null,
  duration_min int not null default 60,
  capacity int not null default 10,
  created_at timestamptz not null default now(),
  unique (slot_ref, starts_at)   -- idempotenza generazione
);
create index if not exists class_session_starts_at_idx on public.class_session (starts_at);

-- 3) PRENOTAZIONI ----------------------------------------------------------
create table if not exists public.booking (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.class_session(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'confirmed' check (status in ('confirmed', 'waitlist', 'cancelled')),
  created_at timestamptz not null default now(),
  unique (session_id, user_id)   -- una prenotazione per utente per sessione
);

-- 4) RLS -------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.class_session enable row level security;
alter table public.booking enable row level security;

-- profiles: ognuno vede/aggiorna il proprio
drop policy if exists "profiles self select" on public.profiles;
create policy "profiles self select" on public.profiles for select using (auth.uid() = id);
drop policy if exists "profiles self update" on public.profiles;
create policy "profiles self update" on public.profiles for update using (auth.uid() = id);

-- class_session: lettura pubblica; scrittura solo admin
drop policy if exists "sessions public read" on public.class_session;
create policy "sessions public read" on public.class_session for select using (true);
drop policy if exists "sessions admin write" on public.class_session;
create policy "sessions admin write" on public.class_session for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- booking: l'utente gestisce le proprie; l'admin le vede tutte
drop policy if exists "booking own select" on public.booking;
create policy "booking own select" on public.booking for select
  using (auth.uid() = user_id
         or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
drop policy if exists "booking own delete" on public.booking;
create policy "booking own delete" on public.booking for delete using (auth.uid() = user_id);

-- NB: l'inserimento avviene SOLO via RPC book_session (security definer),
-- per garantire il controllo capienza atomico. Niente insert diretto da client.

-- 5) PRENOTAZIONE ATOMICA (anti-overbooking) -------------------------------
create or replace function public.book_session(p_session uuid)
returns text language plpgsql security definer set search_path = public as $$
declare
  v_cap int;
  v_count int;
  v_uid uuid := auth.uid();
begin
  if v_uid is null then
    return 'unauthenticated';
  end if;

  -- Lock della riga sessione: serializza le prenotazioni concorrenti.
  select capacity into v_cap from public.class_session where id = p_session for update;
  if v_cap is null then
    return 'not_found';
  end if;

  if exists (select 1 from public.booking where session_id = p_session and user_id = v_uid and status <> 'cancelled') then
    return 'already_booked';
  end if;

  select count(*) into v_count from public.booking
    where session_id = p_session and status = 'confirmed';

  if v_count >= v_cap then
    insert into public.booking (session_id, user_id, status) values (p_session, v_uid, 'waitlist')
      on conflict (session_id, user_id) do update set status = 'waitlist';
    return 'waitlist';
  end if;

  insert into public.booking (session_id, user_id, status) values (p_session, v_uid, 'confirmed')
    on conflict (session_id, user_id) do update set status = 'confirmed';
  return 'confirmed';
end; $$;

revoke all on function public.book_session(uuid) from public;
grant execute on function public.book_session(uuid) to authenticated;
