import Image from "next/image";
import Link from "next/link";
import { banglaToNumber } from "@/lib/bangla";
import { getProductEmoji } from "@/lib/emoji";

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
  const formattedChange = new Intl.NumberFormat("bn-BD", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(Math.abs(change));
  const isPositive = change > 0;
  const isNegative = change < 0;
  const iconSource = product.icon || product.emoji || product.image;
  const isImageUrl =
    typeof iconSource === "string" && /^(https?:\/\/|\/)/.test(iconSource);
  const icon = isImageUrl ? null : getProductEmoji(product);
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
      className="group block rounded-2xl border border-gray-100/80 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md"
    >
      <div className="flex h-full min-h-3 flex-col justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f4f6f4] text-xl transition-transform group-hover:scale-110">
            {isImageUrl ? (
              <Image src={iconSource}alt={productName} width={48} height={48}unoptimized className="h-full w-full rounded-2xl object-cover"/>
            ) : ( icon)}
          </div>
          <div className="min-w-0">
            <h3 className="text-base leading-snug font-bold text-gray-900 transition-colors group-hover:text-emerald-600">
              {productName}
            </h3>
            <p className="mt-0.5 text-xs text-gray-400">প্রতি {unit}</p>
          </div>
        </div>

        <div className="mt-4 flex items-end justify-between gap-3 pt-2">
          <div>
            <span className="mb-0.5 block text-[11px] font-medium text-gray-400">
              আজকের দাম
            </span>
            <div className="text-xl leading-none font-extrabold text-gray-900">
              {price} <span className="text-sm font-semibold">টাকা</span>
            </div>
          </div>

          <span
            className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs ${
              isPositive ? "bg-rose-50/80 font-bold text-rose-600" : isNegative ? 
               "bg-emerald-50/80 font-bold text-emerald-700" : "bg-gray-100/80 font-semibold text-black"}`}>
            {isPositive ? "▲" : isNegative ? "▼" : "—"}{" "}
            {formattedChange}%
          </span>
        </div>
      </div>
    </Link>
  );
}
