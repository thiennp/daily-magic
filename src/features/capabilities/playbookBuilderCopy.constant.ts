export const PLAYBOOK_HARNESS_SECTION = {
  title: "Harness bundle (optional)",
  description:
    "Add rules, skills, commands, instructions, or subagents. They install to your Mac when Agent is online.",
} as const;

export const AGENT_BUILDER_ABOUT_SECTION = {
  title: "About this agent",
  description:
    "Name and notes for your library. Standing instructions shape every run.",
} as const;

export const AGENT_BUILDER_INSTRUCTIONS_LABEL = "Standing instructions";

export const AGENT_BUILDER_INSTRUCTIONS_PLACEHOLDER =
  "What this agent should do by default — e.g. Review PRs with security focus";
