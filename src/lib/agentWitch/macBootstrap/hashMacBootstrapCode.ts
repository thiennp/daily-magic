import { createHash } from "node:crypto";

export const hashMacBootstrapCode = (code: string): string =>
  createHash("sha256").update(code.trim()).digest("hex");
