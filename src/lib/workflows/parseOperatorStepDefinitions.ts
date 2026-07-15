import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

export function parseOperatorStepDefinitions(
  value: unknown,
): readonly OperatorStepDefinition[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((entry) => {
    if (typeof entry !== "object" || entry === null) {
      return [];
    }

    const record = entry as Record<string, unknown>;
    const id = typeof record.id === "string" ? record.id.trim() : "";
    const title = typeof record.title === "string" ? record.title.trim() : "";
    const content =
      typeof record.content === "string" ? record.content.trim() : "";

    if (id.length === 0 || title.length === 0 || content.length === 0) {
      return [];
    }

    return [{ id, title, content }];
  });
}
