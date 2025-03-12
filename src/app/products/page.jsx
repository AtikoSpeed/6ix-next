import { getAllProducts } from '@/utils/commercelayer/products';
import ProductsList from '@/components/commercelayer/ProductsList';

export const metadata = {
  title: 'Products | 6ixarchive',
  description: 'Browse all products available in our store',
};

export default async function ProductsPage() {
  const products = await getAllProducts();
  
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      <ProductsList products={products} />
    </div>
  );
}
