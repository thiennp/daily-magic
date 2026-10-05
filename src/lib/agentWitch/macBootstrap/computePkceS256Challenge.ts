import { createHash } from "node:crypto";

/** RFC 7636 S256: BASE64URL(SHA256(ASCII(code_verifier))). */
export const computePkceS256Challenge = (codeVerifier: string): string =>
  createHash("sha256").update(codeVerifier, "ascii").digest("base64url");
