import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//https://github.com/saleor/storefront/blob/main/src/app/%5Bchannel%5D/(main)/products/%5Bslug%5D/page.tsx

export const formatDate = (date: Date | number) => {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(date);
};

export const formatMoney = (amount: number, currency: string) =>
  new Intl.NumberFormat("sv-se", {
    style: "currency",
    currency,
  }).format(amount);

export const formatMoneyRange = (
  range: {
    start?: { amount: number; currency: string } | null;
    stop?: { amount: number; currency: string } | null;
  } | null
) => {
  const { start, stop } = range || {};
  const startMoney = start && formatMoney(start.amount, start.currency);
  const stopMoney = stop && formatMoney(stop.amount, stop.currency);

  if (startMoney === stopMoney) {
    return startMoney;
  }

  return `${startMoney} - ${stopMoney}`;
};
