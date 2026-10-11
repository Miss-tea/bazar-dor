import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";

export default async function Page() {
  let productsData;
  let loadFailed = false;
  try {
    productsData = await getProducts();
  } catch (error) {
    console.warn("Failed to load products:", error);
    loadFailed = true;
  }

  const products = Array.isArray(productsData)
    ? productsData
    : Array.isArray(productsData?.products)
      ? productsData.products
      : [];
  const validProducts = products.filter(Boolean);
  console.log(
    "FIRST PRODUCT OBJECT:",
    JSON.stringify(validProducts[0] ?? null, null, 2),
  );
  const getChange = (product) => {
    const change = Number(
      product.change?.pct ??
        product.change_percentage ??
        product.change ??
        product.price_change ??
        0,
    );
    return Number.isFinite(change) ? change : 0;
  };
  const risers = validProducts
    .filter((product) => getChange(product) > 0)
    .sort((a, b) => getChange(b) - getChange(a))
    .slice(0, 6);
  const fallers = validProducts
    .filter((product) => getChange(product) < 0)
    .sort((a, b) => getChange(a) - getChange(b))
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      <Hero />
      <div className="mx-auto mt-8 max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
        {risers.length > 0 && (
          <section>
            <div className="mb-6 flex items-center gap-2">
              <span className="text-xl font-bold text-emerald-600">▲</span>
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                আজ দাম বেড়েছে
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {risers.map((product, index) => (
                <ProductCard
                  key={
                    product.id ??
                    product._id ??
                    product.slug ??
                    `${product.nameBn ?? product.name ?? product.name_bn ?? index}-${index}`
                  }
                  product={product}
                />
              ))}
            </div>
          </section>
        )}

        {fallers.length > 0 && (
          <section>
            <div className="mb-6 flex items-center gap-2">
              <span className="text-xl font-bold text-rose-600">▼</span>
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                আজ দাম কমেছে
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {fallers.map((product, index) => (
                <ProductCard
                  key={
                    product.id ??
                    product._id ??
                    product.slug ??
                    `${product.nameBn ?? product.name ?? product.name_bn ?? index}-${index}`
                  }
                  product={product}
                />
              ))}
            </div>
          </section>
        )}

        <section id="সব-পণ্য" className="scroll-mt-32 pt-4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">সব পণ্য</h2>
            <p className="mt-1 text-sm text-gray-500">
              {loadFailed
                ? "পণ্যের তথ্য পাওয়া যাচ্ছে না"
                : `মোট ${new Intl.NumberFormat("bn-BD").format(validProducts.length)}টি পণ্য দেখানো হচ্ছে`}
            </p>
          </div>

          {loadFailed ? (
            <div className="rounded-xl border border-gray-200 bg-white py-12 text-center">
              <p role="alert" className="font-medium text-red-500">
                পণ্যের তথ্য এই মুহূর্তে পাওয়া যাচ্ছে না। অনুগ্রহ করে পরে আবার
                চেষ্টা করুন।
              </p>
            </div>
          ) : validProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {validProducts.map((product, index) => (
                <ProductCard
                  key={
                    product.id ??
                    product._id ??
                    product.slug ??
                    product.nameBn ??
                    product.name_bn ??
                    product.name ??
                    index
                  }
                  product={product}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">এখনও কোনো পণ্যের তথ্য পাওয়া যায়নি।</p>
          )}
        </section>
      </div>
    </main>
  );
}
