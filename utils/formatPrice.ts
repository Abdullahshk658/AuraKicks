const PKR_CURRENCY = "PKR";

type FormatPriceOptions = {
  currency?: string;
  locale?: string;
  includeCurrencyCode?: boolean;
};

export function formatPrice(
  value: number | string,
  options: FormatPriceOptions = {}
) {
  const amount =
    typeof value === "number" ? value : Number.parseFloat(value ?? "0");

  const {
    currency = PKR_CURRENCY,
    locale = "en-PK",
    includeCurrencyCode = true
  } = options;

  const formatted = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
    .format(Number.isFinite(amount) ? amount : 0)
    .replace("PKR", "Rs.");

  return includeCurrencyCode ? `${formatted} PKR` : formatted;
}

export function calculateDiscountPercentage(
  price: number,
  compareAtPrice?: number | null
) {
  if (!compareAtPrice || compareAtPrice <= price) {
    return 0;
  }

  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}

export function convertToSubcurrency(amount: number) {
  return Math.round(amount * 100);
}

