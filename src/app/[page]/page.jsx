import Card from "@/components/Card";
import Link from "next/link";

async function getPageData(page) {
  const res = await fetch(
    `https://strapi.6ixarchive.com/api/items?filters[category][$eq]=${page}&populate=itemPic`,
    {
      method: "GET",
      headers: {
        // eslint-disable-next-line no-undef
        Authorization: `bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    },
    { next: { revalidate: 60 } }
  );

  // if (!res.ok) {
  // throw new Error("Failed to fetch data");
  // }

  return res.json();
}

export default async function CategoryPage({ params }) {
  const { page } = await params;

  if (page === "menswear" || page === "womenswear") {
    const response = await getPageData(page);

    // Access the data array from the response
    const items = response.data || [];

    return (
      <div className="container h-[calc(100vh-7.5rem)] max-w-screen grid sm:grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] auto-rows-min gap-4 overflow-auto overflow-x-hidden p-2 pt-0 sm:p-4">
        {items.map((item) => (
          <Link key={item.documentId} href={`/${page}/item/${item.documentId}`}>
            <Card key={item.documentId} props={item} />
          </Link>
        ))}
      </div>
    );
  }
}

export function generateStaticParams() {
  return [{ page: "menswear" }, { page: "womenswear" }];
}
