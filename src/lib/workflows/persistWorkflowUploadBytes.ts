import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import {
  buildWorkflowUploadStoragePath,
  resolveWorkflowUploadRootDir,
} from "@/lib/workflows/resolveWorkflowUploadRootDir";

export const sha256Buffer = (buffer: Buffer): string =>
  createHash("sha256").update(buffer).digest("hex");

export const persistWorkflowUploadBytes = async (
  sha256: string,
  bytes: Buffer,
): Promise<string> => {
  const root = resolveWorkflowUploadRootDir();
  const relativePath = buildWorkflowUploadStoragePath(sha256);
  const absolutePath = path.join(root, relativePath);
  await mkdir(path.dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, bytes);
  return relativePath;
};
