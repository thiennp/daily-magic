/** Format a USD amount for customer-facing pricing copy. */
export const formatUsd = (amount: number): string => {
  if (Number.isInteger(amount)) {
    return `$${amount}`;
  }
  return `$${amount.toFixed(2)}`;
};
