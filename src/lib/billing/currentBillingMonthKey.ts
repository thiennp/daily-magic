/** UTC month key YYYY-MM for infra spend meter. */
export const currentBillingMonthKey = (nowMs: number = Date.now()): string => {
  const d = new Date(nowMs);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
};
