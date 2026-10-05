/** Error slugs for Mac app (`agentwitch-local://install?error=` and exchange JSON). */
export const MAC_BOOTSTRAP_ERROR_SLUG = {
  missing_params: "missing_params",
  invalid_client: "invalid_client",
  invalid_pkce: "invalid_pkce",
  unauthorized: "unauthorized",
  mint_failed: "mint_failed",
  invalid_body: "invalid_body",
  invalid_code: "invalid_code",
  state_mismatch: "state_mismatch",
  bad_verifier: "bad_verifier",
  expired: "expired",
  reused: "reused",
} as const;

export type MacBootstrapErrorSlug =
  (typeof MAC_BOOTSTRAP_ERROR_SLUG)[keyof typeof MAC_BOOTSTRAP_ERROR_SLUG];
