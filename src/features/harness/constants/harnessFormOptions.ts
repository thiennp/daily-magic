import type { HarnessItemKind } from "@/lib/agentWitch/harness/types/HarnessItemKind.constant";
import { HARNESS_ITEM_KINDS } from "@/lib/agentWitch/harness/types/HarnessItemKind.constant";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import { HARNESS_WRITER_AGENTS } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export const HARNESS_WRITER_LABELS: Record<HarnessWriterAgent, string> = {
  "claude-cli": "Claude CLI",
  codex: "Codex (ChatGPT)",
  cursor: "Cursor",
  antigravity: "Antigravity",
};

export const HARNESS_KIND_LABELS: Record<HarnessItemKind, string> = {
  rule: "Rule",
  skill: "Skill",
  command: "Command",
  instruction: "Instruction",
};

export const HARNESS_WRITER_OPTIONS = HARNESS_WRITER_AGENTS.map((value) => ({
  value,
  label: HARNESS_WRITER_LABELS[value],
}));

export const HARNESS_KIND_OPTIONS = HARNESS_ITEM_KINDS.map((value) => ({
  value,
  label: HARNESS_KIND_LABELS[value],
}));

export const createHarnessItemId = (): string => {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `item-${Date.now()}`;
};
