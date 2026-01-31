export const CDN_BASE =
  "https://cdn.jsdelivr.net/gh/sedatates/invoice-previewer@main";

export const API_BASE =
  import.meta.env.VITE_API_BASE ??
  "https://invoice-backend-production-c91b.up.railway.app";

export const APP_STORE_URL =
  "https://apps.apple.com/tr/app/invoice-studio-quick-invoices/id6756787238";

export const CURRENCIES = [
  { value: "$", label: "$ USD" },
  { value: "€", label: "€ EUR" },
  { value: "£", label: "£ GBP" },
  { value: "₺", label: "₺ TRY" },
];
