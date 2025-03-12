import { getProductBySlug, getAllProducts } from '@/utils/commercelayer/products';
import ProductDetail from '@/components/commercelayer/ProductDetail';

// Generate static params for all products
export async function generateStaticParams() {
  const products = await getAllProducts();
  
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// Metadata for the page
export async function generateMetadata({ params }) {
  const product = await getProductBySlug(params.slug);
  
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
export default async function ProductDetailPage({ params }) {
  const product = await getProductBySlug(params.slug);
  
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
      <ProductDetail product={product} />
    </div>
  );
}
