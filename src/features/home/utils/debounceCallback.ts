export const debounceCallback = <T extends readonly unknown[]>(
  callback: (...args: T) => void,
  delayMs: number,
): ((...args: T) => void) => {
  const state: {
    timeoutId: ReturnType<typeof setTimeout> | undefined;
  } = { timeoutId: undefined };

  return (...args: T): void => {
    if (state.timeoutId !== undefined) {
      clearTimeout(state.timeoutId);
    }

    state.timeoutId = setTimeout(() => {
      state.timeoutId = undefined;
      callback(...args);
    }, delayMs);
  };
};
