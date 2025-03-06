import Card from "@/components/Card";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
// import { urlFor } from "@/sanity/lib/image";

async function getPageData(page) {
  // Query for Sanity instead of Strapi
  const query = groq`*[_type == "taxon" && name.en_us == "${page}"] {
    "items": products[]-> {
      "documentId": _id,
      "attributes": {
        "name": name.en_us,
        "description": description.en_us,
        "itemPic": {
          "data": {
            "attributes": {
              "url": images[0]->images.asset->url
            }
          }
        }
      }
    }
  }`;

  // Use Sanity client to fetch data
  const data = await client.fetch(query);

  return data;
}

export default async function CategoryPage({ params }) {
  const { page } = await params;

  if (page === "menswear" || page === "womenswear") {
    const [response] = await getPageData(page);

    // Access the data array from the response
    const items = response.items || [];
    return (
      <div className="container h-[calc(100vh-7.5rem)] max-w-screen grid lg:grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] xl:grid-cols-[repeat(auto-fit,minmax(20rem,25rem))] auto-rows-min gap-4 overflow-auto overflow-x-hidden p-2 pt-0 sm:p-4">
        {items.map((item) => (
          <Link key={item.documentId} href={`/${page}/item/${item.documentId}`}>
            <Card key={item.documentId} props={item.attributes} />
          </Link>
        ))}
      </div>
    );
  }
}

export function generateStaticParams() {
  return [{ page: "menswear" }, { page: "womenswear" }];
}
