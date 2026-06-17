import { contact, socials } from "@/lib/site";
import { strings } from "@/lib/strings";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://climbpolestudio.it";

/**
 * JSON-LD SportsActivityLocation/LocalBusiness (brief §10). Aiuta SEO/Google.
 * Dati statici da `lib/site` (allineati a Sanity siteSettings).
 */
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: strings.brand.name,
    description: strings.brand.payoff,
    url: SITE_URL,
    telephone: contact.phoneE164,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      postalCode: contact.address.zip,
      addressLocality: contact.address.city,
      addressCountry: "IT",
    },
    sameAs: socials.map((s) => s.href),
    image: `${SITE_URL}/logo.png`,
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
