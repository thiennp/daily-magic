export function parseImprovementBody(
  body: unknown,
): { readonly suggestion: string } | undefined {
  if (typeof body !== "object" || body === null) {
    return undefined;
  }

  const rawSuggestion = (body as Record<string, unknown>).suggestion;
  const suggestion =
    typeof rawSuggestion === "string" ? rawSuggestion.trim() : "";

  if (suggestion.length === 0) {
    return undefined;
  }

  return { suggestion };
}
