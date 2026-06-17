import { SmoothScroll } from "@/components/providers/smooth-scroll";
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
      <StructuredData />
      <Navbar />
      {children}
      <Footer />
      <WhatsappFab />
    </SmoothScroll>
  );
}
