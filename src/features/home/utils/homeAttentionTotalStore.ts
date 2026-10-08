/**
 * a13083ee: the greeting ("N things need you") and the "Needs your
 * attention" badge read one number. The panel publishes its total (runs plus
 * skill questions); the greeting falls back to the run count until then.
 */
const listeners = new Set<() => void>();
const state: { total: number | null } = { total: null };

export const publishHomeAttentionTotal = (total: number | null): void => {
  if (state.total === total) {
    return;
  }
  state.total = total;
  for (const listener of listeners) {
    listener();
  }
};

export const readHomeAttentionTotal = (): number | null => state.total;

export const subscribeHomeAttentionTotal = (
  listener: () => void,
): (() => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};
