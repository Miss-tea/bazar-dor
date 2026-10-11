import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProduct } from "@/lib/api";
import { getProductEmoji } from "@/lib/emoji";

function ProductLoading() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl animate-pulse space-y-8">
        <div className="h-64 rounded-2xl border border-gray-200 bg-white" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-24 rounded-xl border border-gray-200 bg-white"
            />
          ))}
        </div>
        <div className="h-56 rounded-xl border border-gray-200 bg-white" />
      </div>
    </main>
  );
}

export default function ProductPage({ params }) {
  return (
    <Suspense fallback={<ProductLoading />}>
      <ProductContent params={params} />
    </Suspense>
  );
}

async function ProductContent({ params }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/signin?authRequired=1");
  }

  const { slug } = await params;
  const response = await getProduct(slug);
  const product = Array.isArray(response)
    ? response.find(
        (item) =>
          String(item?.id ?? item?._id ?? item?.slug) === String(slug),
      ) ?? response[0]
    : (response?.product ?? response?.data?.product ?? response?.data ?? response);

  if (!product || typeof product !== "object") {
    return (
      <main className="mx-auto min-h-screen max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          পণ্যের তথ্য পাওয়া যায়নি
        </h1>
        <p className="mt-3 text-gray-600">
          পণ্যটি অনুপলব্ধ হতে পারে অথবা তথ্য এই মুহূর্তে লোড করা যাচ্ছে না।
        </p>
        <Link
          href="/#সব-পণ্য"
          className="mt-6 inline-flex rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white hover:bg-emerald-700"
        >
          সব পণ্য দেখুন
        </Link>
      </main>
    );
  }

  const name =
    product.nameBn ||
    product.name_bn ||
    product.name ||
    product.title ||
    "পণ্য";
  const price =
    product.today ?? product.current_price ?? product.price ?? 0;
  const unit = product.unit || "কেজি";
  const image = [product.icon, product.emoji, product.image].find(
    (value) =>
      typeof value === "string" && /^(https?:\/\/|\/)/.test(value),
  );
  const icon = getProductEmoji(product);
  const isImageUrl = Boolean(image);
  const change = Number(
    product.change?.pct ??
      product.change_percentage ??
      product.change ??
      0,
  );
  const formattedChange = Number.isFinite(change) ? change : 0;
  const categoryName =
    product.categoryNameBn || product.category_name || product.category;
  const markets = Array.isArray(product.markets) ? product.markets : [];
  const marketRows = markets
    .map((market) => {
      const min = Number(market.min);
      const max = Number(market.max);
      if (!Number.isFinite(min) || !Number.isFinite(max)) return null;

      return {
        market: market.market || market.name || "বাজার",
        division: market.division || market.location || "—",
        min,
        max,
        average: (min + max) / 2,
      };
    })
    .filter(Boolean);
  const numericPrice = Number(price);
  const minimum = marketRows.length
    ? Math.min(...marketRows.map((market) => market.min))
    : Number(product.min ?? product.minimum_price ?? numericPrice);
  const maximum = marketRows.length
    ? Math.max(...marketRows.map((market) => market.max))
    : Number(product.max ?? product.maximum_price ?? numericPrice);
  const average = marketRows.length
    ? marketRows.reduce((total, market) => total + market.average, 0) /
      marketRows.length
    : Number(product.average ?? product.average_price ?? numericPrice);
  const formatPrice = (value) =>
    Number.isFinite(value) ? `৳${value.toFixed(2).replace(/\.00$/, "")}` : "—";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <article className="grid gap-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10 md:grid-cols-[220px_1fr]">
          <div className="flex min-h-52 items-center justify-center rounded-xl bg-gray-50 p-8">
            {isImageUrl ? (
              <Image
                src={image}
                alt={name}
                width={160}
                height={160}
                unoptimized
                className="max-h-40 w-full object-contain"
                priority
              />
            ) : (
              <span className="text-7xl" aria-hidden="true">
                {icon}
              </span>
            )}
          </div>

          <div className="flex flex-col justify-center">
          <Link
            href="/#সব-পণ্য"
            className="mb-5 text-sm font-medium text-emerald-700 hover:underline"
          >
            ← সব পণ্যে ফিরে যান
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
          <p className="mt-2 text-gray-600">
            {product.description || `${name} এর আজকের বাজারদর`}
          </p>
          <p className="mt-2 text-sm text-gray-500">প্রতি {unit}</p>

          {categoryName && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                {product.categoryIcon ? `${product.categoryIcon} ` : ""}
                {categoryName}
              </span>
            </div>
          )}

          {Number.isFinite(change) && change !== 0 && (
            <p
              className={`mt-4 text-sm font-semibold ${
                change > 0 ? "text-emerald-700" : "text-rose-700"
              }`}
            >
              {change > 0 ? "▲ দাম বেড়েছে " : "▼ দাম কমেছে "}
              {Math.abs(formattedChange).toFixed(1)}%
            </p>
          )}
          </div>
        </article>

        <section aria-label="মূল্য পরিসংখ্যান" className="mt-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { label: "সর্বনিম্ন দাম", value: minimum },
              { label: "সর্বোচ্চ দাম", value: maximum },
              { label: "গড় দাম", value: average },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {formatPrice(stat.value)}
                  <span className="ml-1 text-sm font-normal text-gray-500">
                    / {unit}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>
          {marketRows.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th scope="col" className="px-5 py-3 font-semibold">
                      বাজার
                    </th>
                    <th scope="col" className="px-5 py-3 font-semibold">
                      অবস্থান
                    </th>
                    <th scope="col" className="px-5 py-3 font-semibold">
                      সর্বনিম্ন
                    </th>
                    <th scope="col" className="px-5 py-3 font-semibold">
                      সর্বোচ্চ
                    </th>
                    <th scope="col" className="px-5 py-3 font-semibold">
                      গড়
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {marketRows.map((market, index) => (
                    <tr key={`${market.market}-${index}`}>
                      <td className="px-5 py-3 font-medium">{market.market}</td>
                      <td className="px-5 py-3">{market.division}</td>
                      <td className="px-5 py-3">{formatPrice(market.min)}</td>
                      <td className="px-5 py-3">{formatPrice(market.max)}</td>
                      <td className="px-5 py-3">
                        {formatPrice(market.average)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="rounded-xl border border-gray-200 bg-white p-5 text-gray-600">
              এই পণ্যের জন্য বাজারভিত্তিক দাম পাওয়া যায়নি। আজকের দাম:{" "}
              {formatPrice(numericPrice)}
            </p>
          )}
        </section>
      </div>
    </main>
  );
}