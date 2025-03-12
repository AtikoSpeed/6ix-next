import { getProductBySlug } from '@/utils/sanity/api.ts';
import ProductDetail from '@/components/commercelayer/ProductDetail';
import Link from 'next/link';
import { ArrowLeftIcon } from '@/components/icons/ArrowLeft';

// Metadata for the page
export async function generateMetadata({ params }) {
  const resolvedParams = await Promise.resolve(params);
  const product = await getProductBySlug(resolvedParams.id);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }
  
  return {
    title: `${product.name} | 6ixarchive`,
    description: product.description,
  };
}

// Product detail page
export default async function ItemPage({ params }) {
  // Await params to fix the Next.js error
  const resolvedParams = await params;
  const { page, id } = resolvedParams;
  
  const product = await getProductBySlug(id);
  
  if (!product) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold mb-8">Product Not Found</h1>
        <p>The product you are looking for does not exist.</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8">
        <Link href={`/${page}`} className="inline-flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to {page}
        </Link>
      </div>
      <ProductDetail product={product} />
    </div>
  );
}
