/**
 * Commerce Layer Product Utilities
 * 
 * This file contains utility functions related to Commerce Layer products
 */

/**
 * Format a SKU code with the appropriate size suffix for Commerce Layer
 * 
 * @param {string} skuCode - The base SKU code from Sanity
 * @param {string} size - Optional size code (e.g., "S", "M", "L", "XL", "XXL", "XXXL")
 * @returns {string} Properly formatted SKU code for Commerce Layer
 */
export function formatSkuWithSize(skuCode, size) {
  if (!skuCode) return '';
  
  // Format size suffix based on Commerce Layer conventions
  let sizeSuffix = 'XXXX'; // Default for one-size-fits-all products

  if (size && size !== 'One Size') {
    // Handle specific sizes following the pattern observed
    switch(size.toUpperCase()) {
      case 'XS':
        sizeSuffix = 'XSXX';
        break;
      case 'S':
        sizeSuffix = 'SXXX';
        break;
      case 'M':
        sizeSuffix = 'MXXX';
        break;
      case 'L':
        sizeSuffix = 'LXXX';
        break;
      case 'XL':
        sizeSuffix = 'XLXX';
        break;
      case 'XXL':
        sizeSuffix = 'XXLX';
        break;
      case 'XXXL':
        sizeSuffix = 'XXXL';
        break;
      default:
        // Default to XXXX for unknown sizes
        sizeSuffix = 'XXXX';
    }
  }

  // Remove any existing size suffix if present (assuming it's always 4 chars at the end)
  const baseSkuWithoutSize = skuCode.endsWith('XXXX') || skuCode.endsWith('SXXX') || 
                             skuCode.endsWith('MXXX') || skuCode.endsWith('LXXX') || 
                             skuCode.endsWith('XSXX') || skuCode.endsWith('XLXX') ||
                             skuCode.endsWith('XXLX') || skuCode.endsWith('XXXL')
    ? skuCode.slice(0, -4)
    : skuCode;
  
  return `${baseSkuWithoutSize}${sizeSuffix}`;
}
