"use client";

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import {
  sanityCommerce,
  SanityCommercePluginConfig,
} from "@commercelayer/sanity-plugin-commerce";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

// Configure the Sanity Commerce plugin
const sanityCommerceConfig: SanityCommercePluginConfig = {
  // Use existing product and variant labels
  productLabel: "Product",
  variantLabel: "Variant",
  taxonomyLabel: "Taxonomy",
  taxonLabel: "Taxon",
  // Add any additional product attributes needed
  productAttributes: [
    // The product schema already has name, description, slug, reference, images, variants
  ],
  // Add any additional variant attributes needed
  variantAttributes: [
    // The variant schema already has name, code, description, images, size
  ],
};

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    // Add the Sanity Commerce plugin
    sanityCommerce(sanityCommerceConfig),
  ],
});
