/**
 * Work through `items` with at most `limit` in flight, oldest first. Each call
 * is mostly waiting on the coding tool, so a few at once cut the scan time
 * without more load on the computer. Stops handing out items once `shouldStop`
 * says so; calls already running finish.
 */
export const runPool = async <T>(
  items: readonly T[],
  limit: number,
  shouldStop: () => boolean,
  work: (item: T, index: number) => Promise<void>,
): Promise<void> => {
  const next = { index: 0 };
  const worker = async (): Promise<void> => {
    while (!shouldStop() && next.index < items.length) {
      const index = next.index;
      next.index += 1;
      await work(items[index] as T, index);
    }
  };
  await Promise.all(
    Array.from({ length: Math.max(1, Math.min(limit, items.length)) }, worker),
  );
};
