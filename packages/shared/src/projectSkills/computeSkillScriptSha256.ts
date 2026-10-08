import { createHash } from "node:crypto";

/** Lowercase hex sha256 of the exact UTF-8 bytes of a script. */
export const computeSkillScriptSha256 = (content: string): string =>
  createHash("sha256").update(Buffer.from(content, "utf8")).digest("hex");
