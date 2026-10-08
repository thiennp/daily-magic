import type { AutoSkillJudgePref } from "@/features/project-auto-skills/public-api/types";

export const AUTO_SKILL_JUDGES: readonly {
  readonly value: AutoSkillJudgePref;
  readonly label: string;
  readonly hint: string;
  readonly disabled?: boolean;
}[] = [
  {
    value: "auto",
    label: "Automatic",
    hint: "Your coding agent first, then Ollama",
  },
  {
    value: "agent",
    label: "Coding agent",
    hint: "The signed-in tool on your computer",
  },
  { value: "ollama", label: "Ollama", hint: "A local model on your computer" },
  {
    value: "bot",
    label: "Project bot",
    hint: "Not available yet",
    disabled: true,
  },
];

/** Coding agents that can judge; null = whichever signed-in tool is found first. */
export const AUTO_SKILL_AGENTS: readonly {
  readonly value: string | null;
  readonly label: string;
}[] = [
  { value: null, label: "Any signed-in tool" },
  { value: "codex", label: "Codex" },
  { value: "claude-cli", label: "Claude" },
  { value: "cursor", label: "Cursor" },
];
