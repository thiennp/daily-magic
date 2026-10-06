import path from "node:path";

/**
 * Segment-safe containment for absolute, already-resolved paths: true when
 * `candidate` equals `folder` or sits under it. `/a/proj-evil` is NOT inside
 * `/a/proj` (no raw string startsWith).
 */
export const isPathInsideFolder = (candidate: string, folder: string): boolean => {
  if (!path.isAbsolute(candidate) || !path.isAbsolute(folder)) {
    return false;
  }
  const relative = path.relative(folder, candidate);
  if (relative.length === 0) {
    return true;
  }
  return (
    relative !== ".." &&
    !relative.startsWith(`..${path.sep}`) &&
    !path.isAbsolute(relative)
  );
};
