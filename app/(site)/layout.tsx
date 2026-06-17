import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

/**
 * Layout del sito pubblico (route group `(site)`): smooth scroll + navbar + footer.
 * Tenuto separato dal root layout così `/studio` (Sanity) NON eredita la chrome
 * del sito né lo smooth scroll. Il route group non cambia gli URL.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <Navbar />
      {children}
      <Footer />
    </SmoothScroll>
  );
}
