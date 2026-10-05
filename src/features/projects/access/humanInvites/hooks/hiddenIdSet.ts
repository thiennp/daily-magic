/** Immutable set helpers for deferred-hide revoke/remove UI. */
export const addHiddenId = (
  prev: ReadonlySet<string>,
  id: string,
): ReadonlySet<string> => new Set(prev).add(id);

export const removeHiddenId = (
  prev: ReadonlySet<string>,
  id: string,
): ReadonlySet<string> => {
  const next = new Set(prev);
  next.delete(id);
  return next;
};
