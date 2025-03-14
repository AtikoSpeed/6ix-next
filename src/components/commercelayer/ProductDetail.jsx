"use server";

import Image from 'next/image';
import ProductSizeSelector from './ProductSizeSelector';
import CLProvider from './CommerceLayerProvider';
import { OrderContainer } from '@commercelayer/react-components';

/**
 * Server Component for product detail view
 * This keeps most of the UI rendering on the server
 */
export default async function ProductDetail({ product }) {
  if (!product) return null;
  
  // Extract product data from the structure (now handled on the server)
  const productData = product.attributes || {};
  const name = productData.name || 'Product';
  const description = productData.description || '';
  const imageUrl = productData.itemPic?.data?.attributes?.url || '/placeholder.jpg';
  const skuCode = productData.sku || productData.code || product.documentId || 'DEMO_SKU';
  
  // Define available sizes based on product type (can be determined server-side)
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];
  
  return (
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
        
        {/* Server-side token fetching with CLProvider */}
        <CLProvider>
          {/* Properly wrap Commerce Layer components with OrderContainer */}
          <OrderContainer>
            {/* Client-side interactive parts */}
            <ProductSizeSelector 
              skuCode={skuCode}
              availableSizes={availableSizes}
              productName={name}
              description={description}
            />
          </OrderContainer>
        </CLProvider>
      </div>
    </div>
  );
}
