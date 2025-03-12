"use server";

import Image from "next/image";
import Link from "next/link";

export default function Card({ props }) {
  // Extract product slug for linking to detail page
  const productSlug = props.slug || props.documentId;

  return (
    <Link href={`/product/${productSlug}`} className="block hover:opacity-90 transition-opacity duration-300">
      <div className="card grid grid-cols-1 bg-base-100 shadow-xl h-min lg:h-full">
        <figure className="relative self-start">
          <Image
            src={`${props.itemPic.data.attributes.url}`}
            alt={props.name || "Clothing item"}
            width={100}
            height={100}
            sizes="80vh"
            className="w-full h-auto"
          />
        </figure>
        <div className="card-body self-end">
          <h2 className="card-title">{props.brand}</h2>
          {props.seasonyear && <p>{props.seasonyear}</p>}
          <p>{props.name}</p>
          <p>{`\u20ac ${props.itemPrice || "Gratis"}`}</p>
        </div>
      </div>
    </Link>
  );
}
