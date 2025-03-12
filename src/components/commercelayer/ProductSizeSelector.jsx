"use client";

import { useState } from 'react';
import {
  AddToCartButton,
  LineItemsContainer,
  LineItemsCount,
  OrderContainer,
  PricesContainer,
  Price
} from '@commercelayer/react-components';
import { formatSkuWithSize } from '@/utils/commercelayer/product-utils';
import CLProvider from './CommerceLayerProvider';

/**
 * Client component for interactive elements of product detail
 * This is kept minimal to only include what requires client-side JavaScript
 */
export default function ProductSizeSelector({ skuCode, availableSizes, description }) {
  // State to store the selected size
  const [selectedSize, setSelectedSize] = useState('One Size');
  
  // Handle size selection
  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };
  
  // Get the formatted SKU code with size suffix for Commerce Layer
  const formattedSkuCode = formatSkuWithSize(skuCode, selectedSize !== 'One Size' ? selectedSize : null);
  
  return (
    <CLProvider>
      <OrderContainer>
        {/* Price - Using Commerce Layer Price component */}
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
      </OrderContainer>
    </CLProvider>
  );
}
