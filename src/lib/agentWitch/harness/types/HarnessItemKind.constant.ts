export const HARNESS_ITEM_KINDS = [
  "rule",
  "skill",
  "command",
  "instruction",
  "agent",
] as const;

export type HarnessItemKind = (typeof HARNESS_ITEM_KINDS)[number];
