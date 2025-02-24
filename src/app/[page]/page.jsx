import Card from "@/components/Card";

export default async function CategoryPage({ params }) {
  const { page } = await params;
  if (page === "menswear" || page === "womenswear") {
    return (
      <div className="container h-[calc(100vh-8rem)] max-w-screen grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] auto-rows-min gap-4 overflow-auto overflow-x-hidden p-2 sm:p-4">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    );
  }
}

// export function generateStaticParams() {
// return [{ page: "menswear" }, { page: "womenswear" }];
// }
