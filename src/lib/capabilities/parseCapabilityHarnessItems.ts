import { HARNESS_ITEM_KINDS } from "@/lib/agentWitch/harness/types/HarnessItemKind.constant";
import type { HarnessItemKind } from "@/lib/agentWitch/harness/types/HarnessItemKind.constant";

export interface ParsedCapabilityHarnessItem {
  readonly id: string;
  readonly kind: HarnessItemKind;
  readonly title: string;
  readonly content: string;
}

const isHarnessItemKind = (value: unknown): value is HarnessItemKind =>
  typeof value === "string" &&
  (HARNESS_ITEM_KINDS as readonly string[]).includes(value);

export const parseCapabilityHarnessItems = (
  value: unknown,
): readonly ParsedCapabilityHarnessItem[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((entry) => {
    if (typeof entry !== "object" || entry === null) {
      return [];
    }

    const record = entry as Record<string, unknown>;
    const id = typeof record.id === "string" ? record.id.trim() : "";
    const kind = record.kind;
    const title = typeof record.title === "string" ? record.title.trim() : "";
    const content =
      typeof record.content === "string" ? record.content.trim() : "";

    if (
      id.length === 0 ||
      !isHarnessItemKind(kind) ||
      title.length === 0 ||
      content.length === 0
    ) {
      return [];
    }

    return [{ id, kind, title, content }];
  });
};
