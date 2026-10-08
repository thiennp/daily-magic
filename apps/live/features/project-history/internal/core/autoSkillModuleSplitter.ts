import { MODULE_MAX_PER_RUN } from "./autoSkillModule.constants";

const HARNESS_SEPARATOR = "\n---\n";
const LIST_ITEM = /^\s*(?:\d+[.)]|[-*•])\s+(.*)$/;

/**
 * Deterministic fallback: numbered lines and bullets first, otherwise
 * sentences (and "then" / ";" joins). Injected harness suffix is dropped.
 */
export const splitPromptIntoSteps = (prompt: string): string[] => {
  const body = prompt.split(HARNESS_SEPARATOR, 1)[0] ?? "";
  const items = body
    .split("\n")
    .map((l) => LIST_ITEM.exec(l)?.[1]?.trim() ?? "")
    .filter((l) => l.length > 0);
  const steps =
    items.length >= 2
      ? items
      : body
          .split(/(?<=[.!?])\s+|\n+|;\s*|\bthen\b/i)
          .map((s) => s.trim())
          .filter((s) => s.length > 0);
  return steps.slice(0, MODULE_MAX_PER_RUN);
};
