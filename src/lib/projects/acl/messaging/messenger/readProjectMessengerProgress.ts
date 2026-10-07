/** "40%" / "40 %" (0–100). */
const PERCENT = /(?:^|[^\d.])(\d{1,3})\s?%/;
/** "3/5", "3 / 5", "3 of 5" (step counts; of ≤ 1000). */
const COUNT = /(?:^|\D)(\d{1,4})\s?(?:\/|of)\s?(\d{1,4})(?!\d)/i;

/**
 * Progress a bot put in a task.status summary ("status <id>: 3/5 files",
 * "status <id>: 40%"). Percent → { done: p, of: 100 }. null when the
 * summary has none (or it is out of range). Meta only: reads the ≤200-char
 * summary already stored on the row.
 */
export const readProjectMessengerProgress = (
  text: string,
): { readonly done: number; readonly of: number } | null => {
  const percent = PERCENT.exec(text);
  if (percent !== null) {
    const p = Number(percent[1]);
    return p <= 100 ? { done: p, of: 100 } : null;
  }
  const count = COUNT.exec(text);
  if (count === null) return null;
  const done = Number(count[1]);
  const of = Number(count[2]);
  return of > 0 && of <= 1000 && done <= of ? { done, of } : null;
};
