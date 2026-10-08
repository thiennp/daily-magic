/** Copy for the two skill charts (kept apart from the main impact copy). */
export const PROJECT_KNOWLEDGE_SKILL_COPY = {
  "chart.skillSaved.title": "Tokens saved by skills",
  "chart.skillSaved.description": "Per skill, against its first-run cost.",
  "chart.skillSaved.tip":
    "Estimate (≈) until a skill has 3 samples. Baseline is the token cost of the step without the skill; about 1 in 10 calls skips the skill to keep it fresh.",
  "chart.skillCalls.title": "Skill calls and misses per week",
  "chart.skillCalls.description": "Skill chosen vs skill found but not used.",
  "chart.skillCalls.tip":
    "Measured. A miss is a search that returned a skill the agent then did not use.",
  "chart.skillCalls.chosen": "Chosen",
  "chart.skillCalls.missed": "Missed",
  "chart.col.skill": "Skill",
  "chart.col.saved": "Tokens saved",
  "chart.col.calls": "Calls",
} as const;
