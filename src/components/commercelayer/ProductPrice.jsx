"use client";

import { Price, PricesContainer } from "@commercelayer/react-components";
import { useState, useEffect } from 'react';
import { formatSkuWithSize } from '@/utils/commercelayer/product-utils';

/**
 * Client component for displaying Commerce Layer prices
 * Use this within server components where price display is needed
 * 
 * @param {Object} props
 * @param {string} props.skuCode - The base SKU code from Sanity
 * @param {string} props.size - Optional size code (e.g., "S", "M", "L", "XL", "XXL", "XXXL")
 */
export default function ProductPrice({ skuCode, size }) {
  const [formattedSkuCode, setFormattedSkuCode] = useState('');

  useEffect(() => {
    if (!skuCode) return;
    
    // Use the formatter function to get the properly formatted SKU code
    const formatted = formatSkuWithSize(skuCode, size);
    setFormattedSkuCode(formatted);
    console.log(`Price component using SKU: ${formatted} (original: ${skuCode}, size: ${size || 'default'})`);
  }, [skuCode, size]);

  if (!skuCode || !formattedSkuCode) return null;
  
  return (
    <PricesContainer skuCode={formattedSkuCode}>
      <Price
        className="font-bold text-base"
        compareClassName="text-gray-500 line-through text-sm mr-2"
      />
    </PricesContainer>
  );
}
