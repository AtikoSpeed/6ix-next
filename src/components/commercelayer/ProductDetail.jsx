"use client";

import { useState } from 'react';
import Image from 'next/image';
import {
  AddToCartButton,
  AvailabilityContainer,
  PricesContainer,
  Price,
  VariantSelector,
  VariantsContainer,
} from '@commercelayer/react-components';
import CLProvider from './CommerceLayerProvider';

export default function ProductDetail({ product }) {
  const [selectedImage, setSelectedImage] = useState(
    product.images && product.images.length > 0 ? product.images[0].url : '/placeholder.jpg'
  );
  
  if (!product) return null;
  
  const { name, description, images = [], variants = [] } = product;
  
  // Get the first variant code to use as default
  const firstCode = variants.length > 0 ? variants[0].code : null;

  return (
    <CLProvider>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Images */}
        <div>
          <div className="aspect-square relative overflow-hidden rounded-lg mb-4">
            <Image 
              src={selectedImage} 
              alt={name} 
              fill 
              className="object-cover" 
              priority 
            />
          </div>
          
          {/* Thumbnail gallery */}
          {images.length > 1 && (
            <div className="flex space-x-4 mt-4 overflow-x-auto">
              {images.map((image, index) => (
                <div 
                  key={index} 
                  className={`cursor-pointer h-24 w-24 relative rounded border-2 ${selectedImage === image.url ? 'border-primary' : 'border-gray-200'}`}
                  onClick={() => setSelectedImage(image.url)}
                >
                  <Image 
                    src={image.url} 
                    alt={`${name} - image ${index + 1}`} 
                    fill
                    className="object-cover" 
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{name}</h1>
          
          {/* Price */}
          {firstCode && (
            <div className="mb-6">
              <PricesContainer skuCode={firstCode}>
                <Price 
                  className="text-2xl font-bold text-primary" 
                  compareClassName="text-lg text-gray-500 line-through ml-2" 
                />
              </PricesContainer>
            </div>
          )}
          
          {/* Description */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-2">Description</h2>
            <p className="text-gray-600">{description}</p>
          </div>
          
          {/* Variants */}
          {variants.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-medium mb-4">Variants</h2>
              <VariantsContainer>
                <VariantSelector 
                  options={variants.map(v => ({ 
                    label: v.name || v.size || v.code, 
                    code: v.code,
                    lineItem: {
                      name: product.name,
                      imageUrl: selectedImage
                    }
                  }))}
                  className="w-full p-2 border rounded mb-4"
                  placeholder="Select a variant"
                />
              </VariantsContainer>
            </div>
          )}
          
          {/* Availability & Add to Cart */}
          {firstCode && (
            <div>
              <AvailabilityContainer skuCode={firstCode}>
                <AddToCartButton 
                  className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg w-full transition duration-300"
                  label="Add to Cart" 
                />
              </AvailabilityContainer>
            </div>
          )}
        </div>
      </div>
    </CLProvider>
  );
}
