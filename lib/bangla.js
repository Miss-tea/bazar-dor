const digitMap = {
  "০": "0",
  "১": "1",
  "২": "2",
  "৩": "3",
  "৪": "4",
  "৫": "5",
  "৬": "6",
  "৭": "7",
  "৮": "8",
  "৯": "9",
};
export function banglaToNumber(value) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
      }
  if (value == null || value === "") return 0;

  const normalized = String(value)
    .replace(/[০-৯]/g, (digit) => digitMap[digit])
    .replace(/,/g, "")
    .replace(/[^\d.-]/g, "");
  const number = Number.parseFloat(normalized);
  return Number.isFinite(number) ? number : 0;
}
