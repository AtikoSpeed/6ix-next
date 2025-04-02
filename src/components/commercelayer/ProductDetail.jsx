"use server";

import Image from 'next/image';
import ProductSizeSelector from './ProductSizeSelector';
import CLProvider from './CommerceLayerProvider';
import { OrderContainer } from '@commercelayer/react-components';

/**
 * Optimized Server Component for product detail view
 * This keeps all data fetching and rendering on the server
 * and only delegates interactive parts to client components
 */
export default async function ProductDetail({ product }) {
  if (!product) return null;
  
  // Extract product data from the structure (server-side)
  const productData = product.attributes || {};
  const name = productData.name || 'Product';
  const description = productData.description || '';
  const imageUrl = productData.itemPic?.data?.attributes?.url || '/placeholder.jpg';
  const skuCode = productData.sku || productData.code || product.documentId || 'DEMO_SKU';
  
  // Define available sizes based on product type
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Server-rendered Product Image */}
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
        
        {/* Optimized Commerce Layer Provider - handles token fetching on server */}
        <CLProvider>
          {/* Order Container must be inside Commerce Layer but outside interactive parts */}
          <OrderContainer>
            {/* Client component for interactivity - only interactive parts rendered client-side */}
            <ProductSizeSelector 
              skuCode={skuCode}
              availableSizes={availableSizes}
              description={description}
            />
          </OrderContainer>
        </CLProvider>
      </div>
    </div>
  );
}
