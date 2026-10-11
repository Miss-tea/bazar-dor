import Link from "next/link";
import { getProductEmoji } from "@/lib/emoji";

export default function Ticker({ products = [] }) {
  if (!products.length) return null;

  const renderItemList = (copy) => (
    <div
      key={copy}
      aria-hidden={copy === "duplicate"}
      className="flex items-center gap-8 px-4"
    >
      {products.map((product, index) => (
        <Link
          key={`${product.id ?? product.slug ?? product.name}-${index}`}
          href={`/product/${product.id ?? product.slug}`}
          tabIndex={copy === "duplicate" ? -1 : undefined}
          className="flex items-center gap-2 whitespace-nowrap text-sm hover:underline"
        >
          <span className="text-base" aria-hidden="true">
            {getProductEmoji(product)}
          </span>
          <span className="font-medium text-gray-800">
            {product.nameBn || product.name_bn || product.name}:
          </span>
          <span className="font-semibold text-emerald-600">
            ৳{product.today ?? product.current_price ?? product.price ?? 0}
          </span>
          {product.unit && (
            <span className="text-xs text-gray-500">/{product.unit}</span>
          )}
        </Link>
      ))}
    </div>
  );

  return (
    <div className="select-none overflow-hidden border-b border-emerald-100 bg-emerald-50 py-2">
      <div className="animate-marquee">
        {renderItemList("original")}
        {renderItemList("duplicate")}
      </div>
    </div>
  );
}
