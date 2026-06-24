export const formatBDT = (amount: number, showCurrency = true) => {
  const formatted = Math.round(amount).toLocaleString("en-BD");

  return showCurrency ? `৳ ${formatted}` : formatted;
};
