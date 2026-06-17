"use client";

import dynamic from "next/dynamic";

/**
 * Loader client che monta lo Studio con ssr:false (consentito solo dentro un
 * client component). Tiene tutta la valutazione di Sanity fuori dal server.
 */
const StudioInner = dynamic(() => import("./StudioInner"), { ssr: false });

export function StudioLoader() {
  return <StudioInner />;
}
