import path from "node:path";

/** Namespaces harness destinations under the set slug (ADR 0008 layer 4). */
export const resolveNamespacedHarnessCursorRelativePath = (
  setSlug: string,
  cursorRelativePath: string,
): string => {
  const normalized = cursorRelativePath.replaceAll("\\", "/").trim();
  const segments = normalized.split("/").filter((part) => part.length > 0);
  if (segments.length === 0) {
    return path.posix.join("rules", setSlug, "file");
  }

  const fileName = segments[segments.length - 1] ?? "file";
  const kind = segments[0] ?? "rules";
  return path.posix.join(kind, setSlug, fileName);
};
