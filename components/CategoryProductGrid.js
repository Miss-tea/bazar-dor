"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { banglaToNumber } from "@/lib/bangla";
export default function CategoryProductGrid({ initialProducts }) {
  const [sortOption, setSortOption] = useState("default");
  const sortedProducts = useMemo(() => {
    const products = [...initialProducts];
    if (sortOption === "low-to-high") {
      products.sort(
        (a, b) =>
          banglaToNumber(a.today ?? a.current_price ?? a.price) -
          banglaToNumber(b.today ?? b.current_price ?? b.price),
      );
    } else if (sortOption === "high-to-low") {
      products.sort(
        (a, b) => banglaToNumber(b.today ?? b.current_price ?? b.price) -
          banglaToNumber(a.today ?? a.current_price ?? a.price),
      );
    }
    return products;
  }, [initialProducts, sortOption]);

  return (
    <>
      <div className="mb-6 flex flex-col justify-between gap-4 border-b border-gray-200 pb-4 sm:flex-row sm:items-center">
        <p className="text-sm text-gray-500">
          মোট পণ্য:{" "}
          <span className="font-semibold text-gray-900">
            {sortedProducts.length}
          </span>{" "}
          টি
        </p>

        <div className="flex items-center gap-2">
          <label
            htmlFor="sort-select"
            className="whitespace-nowrap text-sm font-medium text-gray-700"
          >
            সাজান:
          </label>
          <select
            id="sort-select"
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
            className="cursor-pointer rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">দাম: কম থেকে বেশি</option>
            <option value="high-to-low">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product, index) => (
          <ProductCard
            key={
              product.id ??
              product._id ??
              product.slug ??
              `${product.nameBn ?? product.name ?? index}-${index}`
            }
            product={product}
          />
        ))}
      </div>
    </>
  );
}
