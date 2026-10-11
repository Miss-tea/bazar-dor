import Image from "next/image";
import Link from "next/link";
import { banglaToNumber } from "@/lib/bangla";

export default function ProductCard({ product }) {
  if (!product) return null;

  const productName =
    product.nameBn ||
    product.name_bn ||
    product.name ||
    product.title ||
    "পণ্য";
  const price =
    product.today ?? product.current_price ?? product.price ?? 0;
  const unit = product.unit || "কেজি";
  const rawChange = banglaToNumber(
    product.change?.pct ??
      product.price_change_pct ??
      product.change_percentage ??
      product.change ??
      0,
  );
  const change = Number.isFinite(rawChange) ? rawChange : 0;
  const isPositive = change > 0;
  const isNegative = change < 0;
  const badgeColor = isPositive
    ? "border-emerald-100 bg-emerald-50 text-emerald-700"
    : isNegative
      ? "border-rose-100 bg-rose-50 text-rose-700"
      : "bg-gray-100 text-gray-500";
  const arrow = isPositive ? "▲" : isNegative ? "▼" : "—";
  const icon = product.icon || product.emoji || product.image || "🛒";
  const isImageUrl =
    typeof icon === "string" && /^(https?:\/\/|\/)/.test(icon);

  const productPath = product.id ?? product._id ?? product.slug ?? productName;
  const hasPrice =
    product.today != null ||
    product.current_price != null ||
    product.price != null;

  const hasName = Boolean(
    product.nameBn || product.name_bn || product.name || product.title,
  );

  if (!hasName || !hasPrice) {
    console.warn(
      "ProductCard received a product with missing display fields. Available keys:",
      Object.keys(product),
    );
  }

  return (
    <Link
      href={`/product/${encodeURIComponent(productPath)}`}
      className="group flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md"
    >
      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-lg bg-gray-50 p-2 text-3xl transition-transform group-hover:scale-110">
            {isImageUrl ? (
              <Image
                src={icon}
                alt={productName}
                width={32}
                height={32}
                unoptimized
                className="h-8 w-8 object-contain"
              />
            ) : (
              icon
            )}
          </span>
          <span
            className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-bold ${badgeColor}`}
          >
            {isPositive || isNegative ? (
              <>
                <span>{arrow}</span>
                {Math.abs(change).toFixed(1)}%
              </>
            ) : (
              "— ০%"
            )}
          </span>
        </div>

        <h3 className="mb-1 text-base font-bold text-gray-900 transition-colors group-hover:text-emerald-600">
          {productName}
        </h3>
        <p className="text-xs text-gray-500">প্রতি {unit}</p>
      </div>

      <div className="mt-4 flex items-end justify-between border-t border-gray-100 pt-3">
        <div>
          <span className="block text-[11px] text-gray-400">আজকের দাম</span>
          <span className="text-lg font-extrabold text-gray-900">
            ৳{price}
          </span>
        </div>
      </div>
    </Link>
  );
}
