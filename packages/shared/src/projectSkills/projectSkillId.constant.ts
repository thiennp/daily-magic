/** Lowercase slug, never `_`-prefixed (History reserves `_` dirs such as `_drafts`). */
export const PROJECT_SKILL_ID_PATTERN = /^[a-z0-9][a-z0-9_-]{0,63}$/;

/** `sha256:` + lowercase hex of the exact UTF-8 body bytes (no trim, no CRLF fix). */
export const PROJECT_SKILL_CONTENT_HASH_PREFIX = "sha256:";
