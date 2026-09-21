import type { HarnessItemKind } from "@/lib/agentWitch/harness/types/HarnessItemKind.constant";

export const WORKFLOW_RUN_STEP_HARNESS_KINDS = [
  "operator",
  "agent",
] as const satisfies readonly HarnessItemKind[];

export const WORKFLOW_EXTRA_RULE_HARNESS_KINDS = [
  "rule",
  "skill",
  "command",
  "instruction",
] as const satisfies readonly HarnessItemKind[];
