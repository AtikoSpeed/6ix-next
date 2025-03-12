"use client";

import { AddToCartButton as CLAddToCartButton, AvailabilityContainer } from "@commercelayer/react-components";

/**
 * Client component for Commerce Layer add-to-cart functionality
 * Use this within server components where add-to-cart functionality is needed
 */
export default function AddToCartButton({ skuCode }) {
  if (!skuCode) return null;
  
  return (
    <AvailabilityContainer skuCode={skuCode}>
      <CLAddToCartButton 
        className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg w-full"
        label="Add to Cart" 
      />
    </AvailabilityContainer>
  );
}
