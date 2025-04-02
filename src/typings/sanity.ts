import {
  Country,
  Product,
  Size,
  Taxon,
  Taxonomy,
  Variant,
  Image
} from "./models";

// Improved type for localized content
export type LocalizedField = string | {
  [locale: string]: string;
};

// Sanity image type that's different from the core Image type
export interface SanityImage {
  url?: string;
  asset?: {
    url?: string;
  };
}

export interface SanityVariant {
  _id?: string;
  name?: LocalizedField;
  sku?: string;
  code?: string;
  price?: {
    cents: number;
  };
  size?: LocalizedField | {
    name?: LocalizedField;
    [key: string]: any;
  };
  available?: boolean;
  description?: string;
  images?: SanityImage[];
}

// We don't extend Product directly to avoid type mismatches
export interface SanityProduct {
  _id?: string;
  name?: LocalizedField;
  slug?: string | {
    [key: string]: {
      current?: string;
    };
  };
  description?: LocalizedField;
  reference?: string;
  images?: SanityImage[];
  variants?: SanityVariant[];
  category?: {
    name?: LocalizedField;
  };
}

export interface SanitySize {
  name?: LocalizedField | any;
}

export interface SanityTaxon {
  name?: LocalizedField;
  label?: LocalizedField;
  products?: SanityProduct[];
  slug?: string;
  description?: string;
  taxons?: SanityTaxon[];
}

export interface SanityTaxonomy {
  name?: LocalizedField;
  label?: LocalizedField;
  taxons?: SanityTaxon[];
}

// We don't extend Country directly to avoid type mismatches
export interface SanityCountry {
  name?: LocalizedField;
  code?: string;
  marketId?: string;
  defaultLocale?: string;
  image?: {
    url?: string;
    asset?: {
      url?: string;
    };
  };
  domain?: string;
  catalog?: {
    id?: string;
  };
}
