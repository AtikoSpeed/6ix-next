/**
 * Commerce Layer Product Data Access Layer
 * Optimized integration with Sanity for product retrieval
 */

import { client } from '../sanity/client';

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
    const products = await client.fetch(query, {}, {
      cache: 'no-store' // Ensures fresh data on each request
    });
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
  if (!slug) {
    console.error('Product slug is required');
    return null;
  }
  
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
    const product = await client.fetch(query, { slug }, {
      cache: 'no-store' // Ensures fresh data on each request
    });
    return product;
  } catch (error) {
    console.error(`Error fetching product with slug ${slug}:`, error);
    return null;
  }
}
