export default async function ItemPage({ params }) {
  const { id } = await params;
  return <h1>{id}</h1>;
}
