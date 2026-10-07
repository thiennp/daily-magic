import type { OwnerLlmDraftWriterMode } from "./ownerLlmDraftWriter.port";

export type BuildOwnerLlmSkillDraftPromptInput = {
  readonly scrubbedTranscript: string;
  readonly similarDraftHints: readonly {
    readonly name: string;
    readonly description: string;
  }[];
  readonly mode: OwnerLlmDraftWriterMode;
  /** Prior reflect output when mode is reflect_then_write (second call). */
  readonly reflection?: string;
};

const HINTS = (hints: BuildOwnerLlmSkillDraftPromptInput["similarDraftHints"]): string => {
  if (hints.length === 0) {
    return "(none)";
  }
  return hints
    .map((h) => `- ${h.name}: ${h.description}`)
    .join("\n");
};

/** Reflect-only prompt (first call when transcript exceeds the input cap). */
export const buildOwnerLlmSkillReflectPrompt = (
  input: Pick<BuildOwnerLlmSkillDraftPromptInput, "scrubbedTranscript" | "similarDraftHints">,
): string =>
  [
    "You are preparing a reusable project skill from a scrubbed chat transcript.",
    "Do NOT invent secrets. Summarize the procedure only.",
    "Return a short reflection covering: goal, inputs, 3–8 concrete steps,",
    "pitfalls, and how to verify success. Plain text, no SKILL.md yet.",
    "",
    "Similar existing drafts/skills to avoid overlap:",
    HINTS(input.similarDraftHints),
    "",
    "Transcript:",
    input.scrubbedTranscript,
  ].join("\n");

/** Write prompt (one-shot, or second call after reflect). */
export const buildOwnerLlmSkillWritePrompt = (
  input: BuildOwnerLlmSkillDraftPromptInput,
): string => {
  const reflectionBlock =
    input.reflection !== undefined && input.reflection.trim().length > 0
      ? ["", "Prior reflection (use as outline):", input.reflection.trim(), ""]
      : [""];
  return [
    "Write ONE SKILL.md draft from the scrubbed transcript.",
    "Output ONLY the markdown file: YAML frontmatter then body.",
    "Frontmatter keys: name (kebab-case), description, version: 0.1.0, status: draft.",
    "Do NOT write source_message_ids; the system adds the transcript message ids.",
    "Body sections: When to use, Inputs, Steps (3–8, use placeholders for specifics),",
    "Pitfalls, Verification.",
    "Avoid overlapping similar drafts/skills listed below.",
    "",
    "Similar existing drafts/skills:",
    HINTS(input.similarDraftHints),
    ...reflectionBlock,
    "Transcript:",
    input.scrubbedTranscript,
  ].join("\n");
};
