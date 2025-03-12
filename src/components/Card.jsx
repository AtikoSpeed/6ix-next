import Image from "next/image";
import Link from "next/link";

export default function Card({ props, category }) {
  if (!props) return null;

  // Extract product information from your specific Sanity schema structure
  const documentId = props.documentId;
  const product = props.attributes || {};
  
  // Get product name
  const name = product.name || '';
  
  // Get product slug/id for the link
  const productId = documentId || '';
  
  // Get the image URL based on your schema structure
  let imageUrl = '/placeholder.jpg';
  if (product.itemPic?.data?.attributes?.url) {
    imageUrl = product.itemPic.data.attributes.url;
  }

  // Use provided category or default to menswear
  const page = category || 'menswear';

  return (
    <Link href={`/${page}/item/${productId}`} className="group">
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
        <h3 className="text-lg font-medium">{name}</h3>
      </div>
    </Link>
  );
}
