import { getProducts } from "@/lib/api";

export default async function Page() {
  const data = await getProducts();
  console.log("Raw product object shape:", data);

  return (
    <main className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Products</h1>
      <pre className="overflow-auto rounded bg-gray-100 p-4 text-sm text-gray-900">
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}
