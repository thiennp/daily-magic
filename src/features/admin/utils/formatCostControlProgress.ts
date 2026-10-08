/** Share of the budget already spent, clamped to 0–100 for a progress bar. */
export default function formatCostControlProgress(
  spendEur: number,
  budgetEur: number,
): number {
  if (budgetEur <= 0) return spendEur > 0 ? 100 : 0;
  return Math.min(100, Math.max(0, (spendEur / budgetEur) * 100));
}
