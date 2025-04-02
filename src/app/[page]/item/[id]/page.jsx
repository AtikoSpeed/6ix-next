import React, { Suspense } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/utils/sanity/api';
import ProductInteractiveElements from '@/components/ProductInteractiveElements';

export default async function ItemPage({ params }) {
  const { id } = await params; 

  const productData = await getProductBySlug(id); 

  if (!productData) {
    notFound();
  }

  // Destructure for easier access
  const { name, description, images, variants } = productData;

  return (
    <Suspense fallback={<div>Loading product details...</div>}>
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Gallery (Server Rendered) */}
          <div>
            {images?.[0]?.url && (
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
                <Image
                  src={images[0].url}
                  alt={name || 'Product Image'}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                  priority
                />
              </div>
            )}
            {/* TODO: Add thumbnails for multiple images */}
          </div>

          {/* Product Info (Partially Server Rendered) */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{name}</h1>
            
            {/* Interactive Elements (Client Rendered) */}
            <ProductInteractiveElements 
              variants={variants} 
              description={description} 
            />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
