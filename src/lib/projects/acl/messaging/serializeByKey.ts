const tails = new Map<string, Promise<unknown>>();

/**
 * Run `task` after any earlier task with the same key in this process has
 * settled. Different keys run in parallel. The key is forgotten once its last
 * task settles, so the map stays small.
 */
export const serializeByKey = async <T>(
  key: string,
  task: () => Promise<T>,
): Promise<T> => {
  const previous = tails.get(key) ?? Promise.resolve();
  const current = previous.catch(() => undefined).then(task);
  tails.set(key, current);
  try {
    return await current;
  } finally {
    if (tails.get(key) === current) {
      tails.delete(key);
    }
  }
};
