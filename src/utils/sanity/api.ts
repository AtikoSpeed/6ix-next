import { createClient, groq } from "next-sanity";
import _ from "lodash";
import { Product, Taxon, Taxonomy, Variant, Image, Size, Country, Catalog } from "@/typings/models";
import { 
  LocalizedField,
  SanityCountry, 
  SanityImage, 
  SanityProduct, 
  SanityTaxon, 
  SanityTaxonomy,
  SanityVariant 
} from "@/typings/sanity";
import { client } from "./client";
import { parseLocale } from "@/utils/parser";

// Helper function to parse product variants
function parseVariants(variants: SanityVariant[] = [], lang = "en_us"): Variant[] {
  if (!variants || !Array.isArray(variants)) return [];
  
  return variants.map(variant => ({
    name: typeof variant.name === 'string' ? variant.name : (variant.name?.[lang] || ''),
    code: variant.sku || variant.code || '',
    description: variant.description || '',
    size: { name: typeof variant.size === 'string' ? variant.size : (variant.size?.[lang] || (variant.size?.name?.[lang]) || '') },
    images: variant.images?.map(img => ({ url: img?.url || '' })) || []
  }));
};

// Helper function to parse product data
function parseProduct(product: SanityProduct | null): Product | null {
  if (!product) return null;

  // Prepare images
  const images: Image[] = (product.images || []).map(image => ({
    url: image?.url || (image?.asset?.url) || ''
  }));

  // Extract name, slug, and description safely with type checks
  let name = '';
  if (typeof product.name === 'string') {
    name = product.name;
  } else if (product.name && typeof product.name === 'object') {
    name = product.name.en_us || '';
  }

  let slug = '';
  if (typeof product.slug === 'string') {
    slug = product.slug;
  } else if (product.slug && typeof product.slug === 'object') {
    slug = product.slug.en_us?.current || '';
  }

  let description = '';
  if (typeof product.description === 'string') {
    description = product.description;
  } else if (product.description && typeof product.description === 'object') {
    description = product.description.en_us || '';
  }

  // Create a valid Product object according to the interface
  const parsedProduct: Product = {
    name,
    slug,
    description,
    images,
    variants: parseVariants(product.variants || []),
    reference: product.reference || ''
  };

  return parsedProduct;
};

function parsingVariant(
  variants: SanityVariant[],
  lang = "en_us"
): Variant[] {
  return !_.isEmpty(variants)
    ? variants.map((variant) => {
        // Safely handle name (could be string or object)
        let variantName = "";
        if (typeof variant.name === "string") {
          variantName = variant.name;
        } else if (variant.name && typeof variant.name === "object") {
          variantName = variant.name[lang] || "";
        }

        // Safely handle size (could be string or object)
        let sizeName = "";
        if (typeof variant.size === "string") {
          sizeName = variant.size;
        } else if (variant.size && typeof variant.size === "object") {
          if (variant.size.name && typeof variant.size.name === "object") {
            sizeName = variant.size.name[lang] || "";
          } else {
            sizeName = variant.size[lang] || "";
          }
        }

        const localization = {
          name: variantName,
          size: { name: sizeName },
          code: variant?.code || "",
          description: variant?.description || "",
          images: variant?.images?.map(img => ({ url: img?.url || '' })) || [],
        };
        return localization as Variant;
      })
    : [];
};

function parsingProduct(
  products: SanityProduct[] | SanityProduct,
  lang = "en_us"
): Product[] | Product {
  return Array.isArray(products)
    ? products.map((product) => {
        const localization: Product = {
          name: typeof product.name === 'string' ? product.name : (product.name?.[lang] || ""),
          slug: typeof product.slug === 'string' ? product.slug : (product.slug?.["en_us"]?.current || ""),
          description: typeof product.description === 'string' ? product.description : (product.description?.[lang] || ""),
          variants: parsingVariant(product?.variants || [], lang),
          reference: product?.reference || "",
          images: product?.images?.map(img => ({ url: img?.url || '' })) || []
        };
        return localization;
      })
    : {
        name: typeof (products as SanityProduct)?.name === 'string' 
          ? String((products as SanityProduct)?.name) 
          : ((products as SanityProduct)?.name?.[lang] || ""),
        slug: typeof (products as SanityProduct)?.slug === 'string' 
          ? String((products as SanityProduct)?.slug) 
          : ((products as SanityProduct)?.slug?.["en_us"]?.current || ""),
        description: typeof (products as SanityProduct)?.description === 'string' 
          ? String((products as SanityProduct)?.description) 
          : ((products as SanityProduct)?.description?.[lang] || ""),
        variants: parsingVariant((products as SanityProduct)?.variants || [], lang),
        reference: (products as SanityProduct)?.reference || "",
        images: (products as SanityProduct)?.images?.map(img => ({ url: img?.url || '' })) || []
      };
};

function parsingTaxon(taxons: SanityTaxon[], lang = "en_us"): Taxon[] {
  return taxons.map((taxon) => {
    const localization = {
      name: typeof taxon.name === 'string' ? taxon.name : (taxon.name?.[lang] || ""),
      label: typeof taxon.label === 'string' ? taxon.label : (taxon.label?.[lang] || ""),
      slug: "", // Add required properties from Taxon interface
      description: "",
      taxons: [], // Recursive taxons
      products: taxon?.products
        ? (parsingProduct(taxon.products, lang) as Product[])
        : [],
    };
    return localization as Taxon;
  });
};

function parsingTaxonomies(
  taxonomies: SanityTaxonomy[],
  locale = "en-US"
): Taxonomy[] {
  const lang = parseLocale(locale, "_", "-", "lowercase");
  const items = taxonomies.map((taxonomy) => {
    const localization = {
      name: typeof taxonomy.name === 'string' ? taxonomy.name : (taxonomy.name?.[lang] || ""),
      taxons: parsingTaxon(taxonomy?.taxons || [], lang),
    };
    return localization as Taxonomy;
  });
  return items;
};

/**
 * Get all products from Sanity
 */
export async function getAllProducts(): Promise<Product[]> {
  const query = groq`*[_type == "product"]{
    _id,
    name,
    reference,
    "slug": slug.en_us.current,
    description,
    "images": images[]->{
      "url": images.asset->url
    },
    "variants": variants[]->{
      _id,
      name,
      sku,
      size,
      price,
      available,
      description,
      "images": images[]->{
        "url": images.asset->url
      }
    },
    "category": category->
  }`;

  try {
    const products = await client.fetch(query);
    return products.map((product: SanityProduct) => parseProduct(product)).filter(Boolean) as Product[];
  } catch (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
}

/**
 * Get a specific product by slug (ID in this case)
 */
export async function getProductBySlug(id: string): Promise<any | null> {
  if (!id) return null;

  // Updated query to match your Sanity studio structure and include Commerce Layer fields
  const query = groq`*[_type == "product" && _id == $id][0] {
    "documentId": _id,
    "attributes": {
      "name": name.en_us,
      "description": description.en_us,
      "itemPic": {
        "data": {
          "attributes": {
            "url": images[0]->images.asset->url
          }
        }
      },
      "sku": reference,
      "code": reference
    }
  }`;

  try {
    const product = await client.fetch(query, { id });
    return product;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return null;
  }
}

/**
 * Get products by category
 */
export async function getProductsByCategory(category: string): Promise<any[]> {
  if (!category) return [];

  // Updated query to match your Sanity studio structure
  const query = groq`*[_type == "taxon" && name.en_us==$category] {
    "items": products[]-> {
      "documentId": _id,
      "attributes": {
        "name": name.en_us,
        "description": description.en_us,
        "itemPic": {
          "data": {
            "attributes": {
              "url": images[0]->images.asset->url
            }
          }
        }
      }
    }
  }`;

  try {
    const result = await client.fetch(query, { category });
    // Extract all products from the 'items' array in the first taxon
    return result && result.length > 0 ? result[0].items || [] : [];
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    return [];
  }
}

const getAllCountries = async (locale = "en-US") => {
  const lang = parseLocale(locale, "_", "-", "lowercase");
  const query = groq`*[_type == "country"]{
    name,
    code,
    marketId,
    defaultLocale,
    "image": {
      "url": image.asset->url
    },
    'catalog': {
      'id': catalog->_id
    }
  } | order(name["${lang}"] asc)`;
  const countries = await client.fetch<SanityCountry[]>(query);
  return countries.map((country) => {
    const localization = {
      name: country?.name?.[lang] || "",
      code: country?.code || "",
      marketId: country?.marketId || "",
      defaultLocale: country?.defaultLocale || "",
      image: { url: country?.image?.url || "" },
      catalog: { name: "", taxonomies: [] } // Add minimal Catalog structure
    };
    return localization as Country;
  });
};

const getAllTaxonomies = async (catalogId: string, locale = "en-US") => {
  const query = groq`*[_type == "catalog" && _id == '${catalogId}']{
    'taxonomies': taxonomies[]->{      
      label,
      name,
      'taxons': taxons[]->{        
        label,
        name,
        'products': products[]->{          
          name,
          description,
          reference,
          slug,
          'images': images[]->{            
            'url': images.asset->url
          },
          'variants': variants[]->{           
            code,
            name,
            size->,
          }    
        }
      }
    }
  }  | order(name asc)`;
  const items: any[] = await client.fetch(query);
  return parsingTaxonomies(_.first(items)?.taxonomies || [], locale);
};

const getProduct = async (slug: string, locale = "en-US") => {
  const lang = parseLocale(locale, "_", "-", "lowercase");
  const query = groq`*[_type == "product" && slug.en_us.current == '${slug}']{
    name,
    description,
    reference,
    slug,
    'images': images[]->{      
      'url': images.asset->url
    },
    'variants': variants[]->{      
      label,
      code,
      name,
      size->,
      'images': images[]->{        
        'url': images.asset->url
      }
    }    
  }`;
  const item: any[] = await client.fetch(query);
  return parsingProduct(_.first(item) || {}, lang);
};

const sanityApi: Record<string, any> = {
  getAllCountries,
  getAllTaxonomies,
  getProduct,
  getAllProducts,
  getProductBySlug,
  getProductsByCategory,
};

export default sanityApi;
