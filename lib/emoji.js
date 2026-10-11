const isUsableIcon = (value) =>
  typeof value === "string" &&
  value.length > 0 &&
  value !== "🛒" &&
  !/^(https?:\/\/|\/)/.test(value);

export function getProductEmoji(product = {}) {
  if (!product || typeof product !== "object") return "🛒";

  for (const value of [product.icon, product.emoji, product.image]) {
    if (isUsableIcon(value)) return value;
  }

  const name = String(  product.nameBn || product.name_bn || product.name || "", ).toLowerCase();
  const category = String(
    product.categoryNameBn ||   product.category_name || product.category ||  "", ).toLowerCase();
  if (name.includes("চাল") || category.includes("চাল")) return "🍚";
  if (name.includes("ডাল") || category.includes("ডাল")) return "🫘";
  if (name.includes("তেল") || category.includes("তেল")) return "🛢️";
  if (
    name.includes("আলু") ||
    name.includes("পেঁয়াজ") ||
    name.includes("পেঁয়াজ") ||
    name.includes("রসুন") ||
    name.includes("আদা") ||
    category.includes("সবজি")
  ) {
    return "🥔";
   }
  if (name.includes("মাছ") || category.includes("মাছ")) return "🐟";
  if (
    name.includes("মাংস") ||
    name.includes("গরু") ||
    name.includes("খাসি") ||
     name.includes("মুরগি")
  ) {
    return "🥩"; }
  if (
    name.includes("ডিম") || name.includes("দুধ") ||category.includes("ডিম")
  ) {
    return "🥚";
  }
  if (
    name.includes("মরিচ") ||   name.includes("হলুদ") ||  name.includes("মশলা") ||
    name.includes("মসলা") ||
    category.includes("মশলা") ||
    category.includes("মসলা")
  ) {
    return "🌶️"; }
  if (name.includes("চিনি") || name.includes("লবণ")) return "🧂";
  return "🛒";
}
