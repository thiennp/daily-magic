import path from "node:path";

import { isSha256Hex } from "./safeRunPaths";

const resolveComponentStoreBlobPath = (
  installDir: string,
  contentSha256: string,
): string => {
  const trimmed = contentSha256.trim();

  // A hash that is not 64 hex digits is never a blob: point at a path that cannot exist.
  if (!isSha256Hex(trimmed)) {
    return path.join(installDir, "components", "store", "invalid-hash");
  }

  return path.join(
    installDir,
    "components",
    "store",
    trimmed.slice(0, 2),
    trimmed,
  );
};

export default resolveComponentStoreBlobPath;
