/** UTC calendar day key `YYYY-MM-DD` for daily token budgets. */
export const utcDayKey = (nowMs: number): string =>
  new Date(nowMs).toISOString().slice(0, 10);
