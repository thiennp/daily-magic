/**
 * Server re-scan before accepting a sync blob. Patterns mirror AWL scrubbers
 * at a coarse level — residualSecret → reject, never store.
 */
const SECRET_PATTERNS: readonly RegExp[] = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /\bsk-[A-Za-z0-9]{20,}\b/,
  /\bghp_[A-Za-z0-9]{20,}\b/,
  /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/,
  /\bAKIA[0-9A-Z]{16}\b/,
  /\bBearer\s+[A-Za-z0-9._\-]{20,}\b/i,
];

export const scanProjectSyncContentForSecrets = (
  text: string,
): { readonly ok: true } | { readonly ok: false; readonly code: "secret_suspect" } => {
  for (const pattern of SECRET_PATTERNS) {
    if (pattern.test(text)) {
      return { ok: false, code: "secret_suspect" };
    }
  }
  return { ok: true };
};
