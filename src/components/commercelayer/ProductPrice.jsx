"use client";

import { Price, PricesContainer } from "@commercelayer/react-components";

/**
 * Client component for displaying Commerce Layer prices
 * Use this within server components where price display is needed
 */
export default function ProductPrice({ skuCode }) {
  if (!skuCode) return null;
  
  return (
    <PricesContainer skuCode={skuCode}>
      <Price
        className="font-bold text-base"
        compareClassName="text-gray-500 line-through text-sm mr-2"
      />
    </PricesContainer>
  );
}
