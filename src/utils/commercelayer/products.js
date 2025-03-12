/* eslint-disable no-undef */
import { createClient } from 'next-sanity';

// For server components, use direct access to environment variables
// Next.js automatically loads .env.local file in server components
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03';
const isProduction = process.env.NODE_ENV === 'production';

// Initialize Sanity client
const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: isProduction,
});

/**
 * Fetches all products from Sanity
 * @returns {Promise<Array>} Array of products
 */
export async function getAllProducts() {
  const query = `*[_type == "product"]{
    _id,
    name,
    description,
    "slug": slug.current,
    "images": images[]{
      "url": asset->url
    },
    "variants": variants[]{
      _key,
      name,
      code,
      price,
      "size": size->name
    }
  }`;

  try {
    const products = await client.fetch(query);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

/**
 * Fetches a single product by slug
 * @param {string} slug - The product slug
 * @returns {Promise<Object|null>} Product object or null if not found
 */
export async function getProductBySlug(slug) {
  const query = `*[_type == "product" && slug.current == $slug][0]{
    _id,
    name,
    description,
    "slug": slug.current,
    "images": images[]{
      "url": asset->url
    },
    "variants": variants[]{
      _key,
      name,
      code,
      price,
      "size": size->name
    }
  }`;

  try {
    const product = await client.fetch(query, { slug });
    return product;
  } catch (error) {
    console.error(`Error fetching product with slug ${slug}:`, error);
    return null;
  }
}
