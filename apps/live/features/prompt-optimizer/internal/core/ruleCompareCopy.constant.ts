import { PROJECT_PITFALL_MAX_ACTIVE } from "@agent-witch/shared/pitfalls";

/**
 * Rule compare + Rule use EN (Playbooks tab).
 * limitReached matches AWC `awcProjectPitfallsCopy.limitReached` (package
 * boundary blocks importing that AWC constant from AWL).
 */
export const RULE_COMPARE_COPY = {
  heading: "Compare rules",
  intro:
    "See which rules kick in for a prompt and what they add to each request.",
  groupLabel: "Sample prompts",
  lead: "Try a sample:",
  customLabel: "Or write your own prompt",
  customHint:
    "Use a prompt that has nothing to do with this project. Any rule that still kicks in is probably in the wrong place.",
  button: "Compare",
  emptyPrompt: "Pick a sample prompt or write your own.",
  noRules: "No rules kick in for this prompt.",
  oneRule: "1 rule kicks in for this prompt:",
  nRules: (n: number) => `${n} rules kick in for this prompt:`,
  tokenLine: (a: number, b: number) =>
    `Prompt alone: ${a} tokens. Rules add ${b} tokens.`,
  costLine: (usd: string) => `About ${usd} more per request.`,
  rulesUnavailable: "Rules for this project aren't available right now.",
  ruleUseHeading: "Rule use",
  ruleUseIntro:
    "Rules marked below may be safe to drop. You decide. Nothing is removed for you.",
  usedOnce: "Used 1 time",
  usedN: (n: number) => `Used ${n} times`,
  neverUsed: "Never used",
  notUsedInDays: (n: number) => `Not used in ${n} days`,
  sameAs: (rule: string) => `Same as ${rule}`,
  overlapsWith: (rule: string) => `Overlaps with ${rule}`,
  emptyRules: "No rules to check yet.",
  usageError: "Couldn't load rule usage. Try again.",
  tryAgain: "Try again",
  connectComputer: "Connect this computer to AgentWitch to see rule use.",
  ownerOnlyUsage: "Only the project owner can see rule use.",
  drop: "Drop",
  restore: "Restore",
  undo: "Undo",
  dropped: (title: string) => `Dropped "${title}".`,
  ownerOnlyDrop: "Only the project owner can drop rules.",
  dropFailed: "Couldn't drop the rule. Try again.",
  restoreFailed: "Couldn't restore the rule. Try again.",
  limitReached: `Limit reached: ${PROJECT_PITFALL_MAX_ACTIVE} active pitfalls. Retire one to add another.`,
} as const;
