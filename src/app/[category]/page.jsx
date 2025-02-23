export default function CategoryPage({ params }) {
  const { category } = params;
  return (
    <div>
      <h1 className="text-2xl font-bold">{category}</h1>
      {category}
    </div>
  );
}

export function generateStaticParams() {
  return [{ category: "menswear" }, { category: "womenswear" }];
}
