import type { PromptSdlcGoalPreset } from "./promptSdlcGoalPresets.constant";

/** Project-unrelated samples for rule compare chips. */
export const RULE_COMPARE_SAMPLE_PRESETS: readonly PromptSdlcGoalPreset[] = [
  {
    label: "Haiku",
    goal: "Write a short haiku about morning rain.",
  },
  {
    label: "Trip plan",
    goal: "Plan a quiet weekend trip to a nearby lake.",
  },
  {
    label: "Rainbows",
    goal: "Explain how rainbows form in simple words.",
  },
  {
    label: "Dinner idea",
    goal: "Suggest a quick vegetarian dinner for two.",
  },
];
