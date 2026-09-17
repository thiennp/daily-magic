import crypto from "node:crypto";
import fs from "node:fs";

export const sha256Utf8Content = (content: string): string =>
  crypto.createHash("sha256").update(content, "utf8").digest("hex");

export const sha256FileAtPath = (absolutePath: string): string | null => {
  try {
    const buffer = fs.readFileSync(absolutePath);
    return crypto.createHash("sha256").update(buffer).digest("hex");
  } catch {
    return null;
  }
};
