import path from "node:path";

/** Ids and hashes arrive from the cloud and become path segments here: only plain names pass. */
export const isSafeRunId = (value: string): boolean =>
  /^[A-Za-z0-9_-]{1,100}$/.test(value);

export const isSha256Hex = (value: string): boolean =>
  /^[0-9a-f]{64}$/i.test(value);

/** `relative` joined under `root`, or null when it would leave `root` (.., absolute, symlink-free check). */
export const resolveInside = (
  root: string,
  relative: string,
): string | null => {
  const base = path.resolve(root);
  const target = path.resolve(base, relative);
  return target === base || target.startsWith(base + path.sep) ? target : null;
};
