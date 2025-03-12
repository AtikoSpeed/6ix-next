"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  AddToCartButton,
  LineItemsContainer,
  LineItemsCount,
  OrderContainer
} from '@commercelayer/react-components';
import CLProvider from './CommerceLayerProvider';
import ProductPrice from './ProductPrice';
import { formatSkuWithSize } from '@/utils/commercelayer/product-utils';

export default function ProductDetail({ product }) {
  // State to store the SKU code and size
  const [skuCode, setSkuCode] = useState('');
  const [selectedSize, setSelectedSize] = useState('One Size');
  
  useEffect(() => {
    if (product) {
      const code = product.attributes?.sku || product.attributes?.code || product.documentId || 'DEMO_SKU';
      setSkuCode(code);
      console.log('Using SKU code for Commerce Layer:', code);
    }
  }, [product]);
  
  if (!product) return null;
  
  // Extract product data from the structure
  const productData = product.attributes || {};
  const name = productData.name || 'Product';
  const description = productData.description || '';
  const imageUrl = productData.itemPic?.data?.attributes?.url || '/placeholder.jpg';
  
  // Define available sizes based on product type (simplified for now)
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];
  
  // Handle size selection
  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };
  
  // Get the formatted SKU code with size suffix for Commerce Layer
  const formattedSkuCode = formatSkuWithSize(skuCode, selectedSize !== 'One Size' ? selectedSize : null);
  
  return (
    <CLProvider>
      <OrderContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Image */}
          <div>
            <div className="aspect-square relative overflow-hidden rounded-lg mb-4">
              <Image 
                src={imageUrl} 
                alt={name} 
                fill 
                className="object-cover" 
                priority 
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{name}</h1>
            
            {/* Price - Using Commerce Layer Price component */}
            <div className="mb-6">
              <ProductPrice 
                skuCode={skuCode} 
                size={selectedSize !== 'One Size' ? selectedSize : null} 
              />
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
            
            {/* Add to Cart Button - Now using the formatted SKU code with size */}
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
          </div>
        </div>
      </OrderContainer>
    </CLProvider>
  );
}
