"use server";

import Card from "@/components/Card";
import { getProductsByCategory } from "@/utils/sanity/api.ts";

async function getCategoryProducts(category) {
  try {
    const products = await getProductsByCategory(category);
    return products || [];
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    return [];
  }
}

export default async function CategoryPage({ params }) {
  // Await params to fix the Next.js error
  const resolvedParams = await Promise.resolve(params);
  const page = resolvedParams.page;

  // Make the check case-insensitive
  if (page?.toLowerCase() === "menswear" || page?.toLowerCase() === "womenswear") {
    const categoryName = page.toLowerCase(); // Use lowercase for fetching
    const products = await getCategoryProducts(categoryName);

    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 capitalize">{page}</h1>
        
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product._id} product={product} page={page} />
            ))}
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Page not found</h1>
    </div>
  );
}

export async function generateStaticParams() {
  return [{ page: "menswear" }, { page: "womenswear" }];
}
