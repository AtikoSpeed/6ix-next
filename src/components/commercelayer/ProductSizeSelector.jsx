"use client";

import { useState, useEffect, useRef } from 'react';
import {
  AddToCartButton,
  LineItemsContainer,
  LineItemsCount,
  PricesContainer,
  Price
} from '@commercelayer/react-components';
import { formatSkuWithSize } from '@/utils/commercelayer/product-utils';

/**
 * Client component for interactive elements of product detail
 * This is kept minimal to only include what requires client-side JavaScript
 */
export default function ProductSizeSelector({ skuCode, availableSizes, description, children }) {
  // State to store the selected size
  const [selectedSize, setSelectedSize] = useState('One Size');
  // Track mount state to prevent updates during render
  const mounted = useRef(false);
  // Track the formatted SKU to avoid recalculation during render
  const [formattedSkuCode, setFormattedSkuCode] = useState('');
  
  // Handle size selection
  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };
  
  // Move SKU formatting to useEffect to avoid updates during render
  useEffect(() => {
    // Set mounted ref to true
    mounted.current = true;
    
    // Only update state if component is mounted to avoid "update during render" errors
    if (mounted.current) {
      const formatted = formatSkuWithSize(skuCode, selectedSize !== 'One Size' ? selectedSize : null);
      setFormattedSkuCode(formatted);
    }
    
    // Cleanup function
    return () => {
      mounted.current = false;
    };
  }, [skuCode, selectedSize]);
  
  // Don't render anything until we have the formatted SKU code
  if (!formattedSkuCode) {
    return null;
  }
  
  return (
    <div key="product-selector-wrapper">
      {/* Note: OrderContainer must be inside CommerceLayer from parent */}
      {/* Interactive elements - these use Commerce Layer context */}
      <div className="mb-6">
        <PricesContainer skuCode={formattedSkuCode}>
          <Price
            className="font-bold text-base"
            compareClassName="text-gray-500 line-through text-sm mr-2"
          />
        </PricesContainer>
      </div>
      
      {/* Size selector */}
      <div className="mb-6">
        <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
          Size
        </label>
        <select
          id="size"
          name="size"
          value={selectedSize}
          onChange={handleSizeChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        >
          {availableSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      
      {/* Description */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-2">Description</h2>
        <p className="text-gray-600">{description}</p>
      </div>
      
      {/* Add to Cart Button */}
      <div className="mt-6">
        <AddToCartButton 
          skuCode={formattedSkuCode}
          className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg w-full transition duration-300"
          label="Add to Cart" 
        />
      </div>
      
      {/* Cart Summary */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <LineItemsContainer>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Cart Items:</span>
            <LineItemsCount className="text-sm font-bold bg-primary text-white px-2 py-1 rounded-full" />
          </div>
        </LineItemsContainer>
      </div>
      
      {/* Pass through any children */}
      {children}
    </div>
  );
}
