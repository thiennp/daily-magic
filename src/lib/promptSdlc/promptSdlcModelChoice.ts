import isHarnessWriterAgent from "@/lib/agentWitch/harness/isHarnessWriterAgent";
import type {
  PromptSdlcCallRole,
  PromptSdlcModelChoice,
} from "@/lib/promptSdlc/types/PromptSdlcModelChoice.type";

export const promptSdlcModelId = (choice: PromptSdlcModelChoice): string =>
  choice.kind === "writer"
    ? `writer:${choice.writerAgent}`
    : `ollama:${choice.model}`;

export const parsePromptSdlcModelChoice = (
  kind: string,
  model: string,
): PromptSdlcModelChoice | null => {
  const trimmed = model.trim();
  if (trimmed.length === 0 || trimmed.length > 200 || trimmed.includes("\n")) {
    return null;
  }

  if (kind === "ollama") {
    return { kind: "ollama", model: trimmed };
  }

  if (kind === "writer" && isHarnessWriterAgent(trimmed)) {
    return { kind: "writer", writerAgent: trimmed };
  }

  return null;
};

export const promptSdlcChoiceModelName = (
  choice: PromptSdlcModelChoice,
): string => (choice.kind === "writer" ? choice.writerAgent : choice.model);

export const promptSdlcChoiceNeedsMac = (
  choice: PromptSdlcModelChoice,
): boolean => choice.kind === "writer" && choice.writerAgent !== "cursor-cloud";

export const isPromptSdlcCallRole = (
  value: string,
): value is PromptSdlcCallRole => value === "judge" || value === "improve";
