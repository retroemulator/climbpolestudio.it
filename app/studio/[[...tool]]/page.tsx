import { StudioLoader } from "./studio-loader";

/**
 * Studio Sanity embeddato (brief §4) su /studio. Catch-all `[[...tool]]` →
 * tutte le sotto-rotte dello Studio restano qui. Fuori dal route group `(site)`,
 * quindi niente navbar/footer/smooth-scroll. Render client-only (vedi loader).
 */
export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <StudioLoader />;
}
