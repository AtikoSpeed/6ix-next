/**
 * Commerce Layer type definitions
 */

/**
 * Type for useGetToken hook that fetches Commerce Layer access tokens
 */
export type UseGetToken = {
  (args: { scope: string; countryCode: string }): string;
};

/**
 * Types for Product and SKU data from Commerce Layer
 */
export interface CommerceSku {
  code: string;
  name?: string;
  price?: number;
}
