/**
 * Commerce Layer Product Utilities
 * Optimized utility functions for Commerce Layer product operations
 * These functions work in both server and client components
 */

/**
 * Format a SKU code with the appropriate size suffix for Commerce Layer
 * 
 * @param {string} skuCode - Base SKU code 
 * @param {string|null} size - Optional size code (e.g., "S", "M", "L")
 * @returns {string} Formatted SKU code for Commerce Layer
 */
export function formatSkuWithSize(skuCode, size) {
  if (!skuCode) return '';
  
  // Size mapping for standardization
  const sizeMap = {
    'XS': 'XSXX',
    'S': 'SXXX',
    'M': 'MXXX',
    'L': 'LXXX',
    'XL': 'XLXX',
    'XXL': 'XXLX',
    'XXXL': 'XXXL',
    'ONE SIZE': 'XXXX',
    'ONE-SIZE': 'XXXX',
    'DEFAULT': 'XXXX'
  };
  
  // Determine the size suffix
  let sizeSuffix = 'XXXX'; // Default
  
  if (size) {
    const normalizedSize = size.toUpperCase().trim();
    sizeSuffix = sizeMap[normalizedSize] || sizeMap.DEFAULT;
  }
  
  // Common size suffixes used in Commerce Layer
  const sizeSuffixes = ['XXXX', 'SXXX', 'MXXX', 'LXXX', 'XSXX', 'XLXX', 'XXLX', 'XXXL'];
  
  // Remove any existing size suffix if present
  let baseSkuWithoutSize = skuCode;
  
  for (const suffix of sizeSuffixes) {
    if (skuCode.endsWith(suffix)) {
      baseSkuWithoutSize = skuCode.slice(0, -4);
      break;
    }
  }
  
  return `${baseSkuWithoutSize}${sizeSuffix}`;
}
