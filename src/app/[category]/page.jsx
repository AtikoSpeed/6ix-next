export default async function CategoryPage({ params }) {
  const { category } = await params;
  return (
    <div>
      <h1 className="text-2xl font-bold">{category}</h1>
      {category}
    </div>
  );
}

// export function generateStaticParams() {
// return [{ category: "menswear" }, { category: "womenswear" }];
// }
