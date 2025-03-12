"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Price, PricesContainer } from '@commercelayer/react-components';

/**
 * Product card component displaying a product with its image, name, and price
 */
export default function ProductCard({ product }) {
  const { images, name, variants, slug } = product;
  const img = images && images.length > 0 ? images[0].url : '/placeholder.jpg';
  const code = variants && variants.length > 0 ? variants[0].code : null;

  return (
    <div className="flex flex-col h-full border-2 rounded-lg p-5 md:p-3 hover:shadow-2xl transition-shadow duration-300">
      <Link href={`/product/${slug}`}>
        <div className="aspect-w-3 aspect-h-2 mb-5">
          <Image
            className="object-contain"
            src={img}
            alt={name}
            width={300}
            height={200}
            priority={false}
          />
        </div>
        <h3 className="text-base leading-6 font-medium space-y-1 h-full">{name}</h3>
        {code && (
          <div className="justify-self-end mt-5">
            <PricesContainer skuCode={code}>
              <Price
                className="text-primary mr-1 text-base font-bold md:text-sm"
                compareClassName="text-gray-500 line-through text-sm md:text-xs"
              />
            </PricesContainer>
          </div>
        )}
      </Link>
    </div>
  );
}
