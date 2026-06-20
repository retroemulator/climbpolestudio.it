import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsappFab } from "@/components/whatsapp-fab";
import { StructuredData } from "@/components/structured-data";

/**
 * Layout del sito pubblico (route group `(site)`): smooth scroll + navbar + footer
 * + WhatsApp flottante + JSON-LD. Separato dal root layout così `/studio` (Sanity)
 * NON eredita la chrome del sito né lo smooth scroll. Il route group non cambia URL.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <a
        href="#contenuto"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-paper focus:px-4 focus:py-2 focus:text-ink focus:shadow-lg"
      >
        Salta al contenuto
      </a>
      <StructuredData />
      <ScrollProgress />
      <Navbar />
      <div id="contenuto" tabIndex={-1} className="outline-none">
        {children}
      </div>
      <Footer />
      <WhatsappFab />
    </SmoothScroll>
  );
}
