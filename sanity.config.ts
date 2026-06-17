import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

/**
 * Config dello Studio Sanity, servito su `/studio` (basePath).
 * Vision tool = playground GROQ per testare le query.
 */
export default defineConfig({
  name: "climb-pole-studio",
  title: "Climb Pole Studio",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
});
