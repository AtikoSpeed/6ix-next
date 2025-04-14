import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "yvajg9ib",
  dataset: "production",
  apiVersion: "2025-04-14",
  useCdn: false,
});
