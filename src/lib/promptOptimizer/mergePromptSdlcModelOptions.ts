import { HARNESS_WRITER_AGENTS } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import { promptSdlcModelId } from "@/lib/promptOptimizer/promptSdlcModelChoice";
import { PROMPT_SDLC_WRITER_LABELS } from "@/lib/promptOptimizer/promptSdlcWriterLabels.constant";
import type { PromptSdlcModelChoice } from "@/lib/promptOptimizer/types/PromptSdlcModelChoice.type";

export interface PromptSdlcModelOption {
  readonly id: string;
  readonly label: string;
  readonly choice: PromptSdlcModelChoice;
}

const writerOption = (
  writerAgent: HarnessWriterAgent,
): PromptSdlcModelOption => {
  const choice: PromptSdlcModelChoice = { kind: "writer", writerAgent };
  return {
    id: promptSdlcModelId(choice),
    label: PROMPT_SDLC_WRITER_LABELS[writerAgent],
    choice,
  };
};

export const mergePromptSdlcModelOptions = (input: {
  readonly installedWriterIds: readonly string[];
  readonly cursorCloudConnected: boolean;
}): readonly PromptSdlcModelOption[] => {
  const installed = new Set(input.installedWriterIds);
  const writers = HARNESS_WRITER_AGENTS.filter(
    (writerAgent) =>
      writerAgent !== "cursor-cloud" && installed.has(writerAgent),
  ).map(writerOption);
  const cloud = input.cursorCloudConnected
    ? [writerOption("cursor-cloud")]
    : [];

  return [...writers, ...cloud];
};

const isThinkingJudge = (option: PromptSdlcModelOption): boolean =>
  option.choice.kind === "writer";

export const pickPromptSdlcDefaultModelIds = (
  options: readonly PromptSdlcModelOption[],
): { readonly judgeId: string; readonly improverId: string } | null => {
  const judge = options.find(isThinkingJudge) ?? options[0];
  if (judge === undefined) {
    return null;
  }

  const improver = options.find((option) => option.id !== judge.id) ?? judge;

  return { judgeId: judge.id, improverId: improver.id };
};
