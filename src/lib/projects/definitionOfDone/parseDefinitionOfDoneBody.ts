export const DEFINITION_OF_DONE_MAX_CHARS = 600;

export type ParsedDefinitionOfDone =
  | { readonly kind: "set"; readonly body: string }
  | { readonly kind: "clear" }
  | { readonly kind: "invalid"; readonly reason: "too_long" | "bad_body" };

/** PUT body { body: string }. Blank clears the definition; over 600 chars is refused. */
export const parseDefinitionOfDoneBody = (
  raw: unknown,
): ParsedDefinitionOfDone => {
  if (typeof raw !== "object" || raw === null || !("body" in raw)) {
    return { kind: "invalid", reason: "bad_body" };
  }
  const value = (raw as { readonly body: unknown }).body;
  if (typeof value !== "string") return { kind: "invalid", reason: "bad_body" };
  const body = value.trim();
  if (body.length === 0) return { kind: "clear" };
  if (body.length > DEFINITION_OF_DONE_MAX_CHARS) {
    return { kind: "invalid", reason: "too_long" };
  }
  return { kind: "set", body };
};
