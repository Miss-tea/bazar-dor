import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-20">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <span className="mb-4 block text-6xl" aria-hidden="true">
          404
        </span>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          পেজটি পাওয়া যায়নি
        </h1>
        <p className="mb-6 text-sm text-gray-500">
          আপনার অন্বেষণকৃত লিংকটি ভুল অথবা পেজটি সরিয়ে ফেলা হয়েছে।
        </p>
        <Link href="/"
          className="inline-block rounded-lg bg-emerald-600 px-6 py-2.5 font-medium text-white shadow transition-colors hover:bg-emerald-700">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
