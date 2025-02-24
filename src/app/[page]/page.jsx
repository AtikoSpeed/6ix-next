export default async function CategoryPage({ params }) {
  const { page } = await params;
  return <div>{page}</div>;
}

// export function generateStaticParams() {
// return [{ category: "menswear" }, { category: "womenswear" }];
// }
