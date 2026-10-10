/** One line per step of auto skills in the computer's log, so a stalled scan is never a mystery. */
export const autoSkillLog = (message: string): void => {
  console.log(`[autoskill] ${message}`);
};

/** Resolves with `fallback` when `work` takes longer than `ms`; the work itself is not cancelled. */
export const withTimeout = async <T>(
  work: Promise<T>,
  ms: number,
  fallback: T,
): Promise<T> => {
  const timer: { id?: ReturnType<typeof setTimeout> } = {};
  const timeout = new Promise<T>((resolve) => {
    timer.id = setTimeout(() => resolve(fallback), ms);
  });
  try {
    return await Promise.race([work, timeout]);
  } finally {
    clearTimeout(timer.id);
  }
};
