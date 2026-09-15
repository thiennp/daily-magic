import { createHash } from "node:crypto";

export const buildLocalHarnessItemId = (sourcePath: string): string => {
  const digest = createHash("sha256")
    .update(sourcePath)
    .digest("hex")
    .slice(0, 12);
  return `local-${digest}`;
};
