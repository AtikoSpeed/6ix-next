import { type SchemaTypeDefinition } from "sanity";
import blockContent from "./documents/blockContent";
import country from "./documents/country";
import catalog from "./documents/catalog";
import size from "./documents/size";
import taxon from "./documents/taxon";
import taxonomy from "./documents/taxonomy";
import variant from "./documents/variant";
import productImage from "./documents/productImage";
import product from "./documents/product";
import homepage from "./documents/homepage";
import singleResourceBlock from "./documents/singleResourceBlock";
import post from "./documents/post";

import localeString from "./locale/String";
import localeText from "./locale/Text";
import localeSlug from "./locale/Slug";
import localeBlockContent from "./locale/BlockContent";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContent,
    country,
    catalog,
    size,
    taxon,
    taxonomy,
    variant,
    productImage,
    product,
    localeString,
    localeText,
    localeSlug,
    localeBlockContent,
    homepage,
    singleResourceBlock,
    post,
  ],
};
