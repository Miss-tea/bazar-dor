import Link from "next/link";
import CategoryProductGrid from "@/components/CategoryProductGrid";
import {
  getCategories,
  getProductsByCategory,
} from "@/lib/api";

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const [categories, products] = await Promise.all([
    getCategories(),
    getProductsByCategory(slug),
  ]);

  const currentCategory = categories.find(
    (category) => (category.slug || category.id) === slug,
  );
  const categoryName =
    currentCategory?.nameBn ||
    currentCategory?.name_bn ||
    currentCategory?.name ||
    slug;

  if (products.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-20 text-center">
        <div className="mx-auto max-w-lg rounded-2xl border border-gray-200 bg-white p-12 shadow-sm">
          <span className="mb-4 block text-5xl" aria-hidden="true">
            🔍
          </span>
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
          </h1>
          <p className="mb-6 text-sm text-gray-500">
            ক্যাটাগরিটি সঠিক নয় অথবা এই মুহূর্তে কোনো পণ্য তালিকাভুক্ত নেই।
          </p>
          <Link
            href="/"
            className="inline-block rounded-lg bg-emerald-600 px-6 py-2.5 font-medium text-white shadow transition-colors hover:bg-emerald-700"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              {categoryName}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              {categoryName} সম্পর্কিত সকল পণ্যের বর্তমান বাজার দর
            </p>
          </div>
        </div>

        <CategoryProductGrid initialProducts={products} />
      </div>
    </main>
  );
}