import { isBoolean, isNonNullObject } from "guardz";

/** Owner toggle body: `{ enabled: boolean }`. Anything else is ignored. */
export const parseProjectComputerHistoryToggleBody = (
  body: unknown,
): { readonly enabled: boolean } | null =>
  isNonNullObject(body) && isBoolean(body.enabled)
    ? { enabled: body.enabled }
    : null;
