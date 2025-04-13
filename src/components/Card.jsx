"use client";

import Image from "next/image";
import Link from "next/link";

export default function Card({ product, page }) {
  if (!product) return null;

  const name = product.name?.en_us || product.name || "";
  const productId = product._id;

  let imageUrl = "/placeholder.jpg";
  if (product.images && product.images.length > 0 && product.images[0]?.url) {
    imageUrl = product.images[0].url;
  }

  const itemLink = `/${page}/item/${productId}`;

  return (
    <Link href={itemLink} className="group">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center transition-all duration-300 group-hover:scale-105"
        />
      </div>
      <div>
        <h3 className="text-lg font-medium mb-1">{name}</h3>
      </div>
    </Link>
  );
}
