import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Revalidation on-demand dei contenuti Sanity.
 *
 * Il webhook di Sanity chiama questa rotta a ogni pubblicazione/modifica/cancellazione.
 * Verifichiamo la firma col secret condiviso, poi svuotiamo la cache dei contenuti
 * (tag globale "sanity", vedi `sanity/lib/fetch.ts`): così le modifiche fatte nello
 * Studio compaiono online in pochi secondi, senza bisogno di rideployare.
 *
 * Setup (una volta sola):
 *  1. Vercel → Settings → Environment Variables (Production):
 *       SANITY_REVALIDATE_SECRET = <stringa casuale lunga>
 *  2. https://www.sanity.io/manage → progetto → API → Webhooks → "Create webhook":
 *       Name:        Revalidate sito
 *       URL:         https://<dominio-del-sito>/api/revalidate
 *       Dataset:     production
 *       Trigger on:  Create, Update, Delete
 *       HTTP method: POST
 *       Secret:      <la STESSA stringa del punto 1>
 */
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature } = await parseBody(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (isValidSignature === null) {
      return new NextResponse(
        "Manca SANITY_REVALIDATE_SECRET: configuralo su Vercel e nel webhook di Sanity.",
        { status: 401 },
      );
    }
    if (!isValidSignature) {
      return new NextResponse("Firma del webhook non valida.", { status: 401 });
    }

    revalidateTag("sanity");
    return NextResponse.json({ revalidated: true });
  } catch (err) {
    console.error("[/api/revalidate]", err);
    return new NextResponse((err as Error).message, { status: 500 });
  }
}
