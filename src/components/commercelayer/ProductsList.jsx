import ProductCard from './ProductCard';

/**
 * Grid of product cards
 */
export default function ProductsList({ products = [] }) {
  if (!products || products.length === 0) {
    return <div className="py-10 text-center">No products found</div>;
  }

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard key={product.id || index} product={product} />
        ))}
      </div>
    </div>
  );
}
