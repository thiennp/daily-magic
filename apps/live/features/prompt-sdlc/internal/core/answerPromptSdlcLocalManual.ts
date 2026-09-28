import { acceptPromptSdlcLocalManualPost } from "./acceptPromptSdlcLocalManualPost";
import { sendPromptSdlcLocalPage } from "./sendPromptSdlcLocalPage";
import type { PromptSdlcLocalModelSelection } from "./promptSdlcLocalForm";
import { readPromptSdlcLocalCycles } from "./promptSdlcLocalStore";
import { ensurePromptSdlcLocalCycleRunning } from "./runPromptSdlcLocalCycle";
import type { PromptSdlcLocalRouteInput } from "./tryHandlePromptSdlcLocalRequest";

export const answerPromptSdlcLocalManual = async (
  input: PromptSdlcLocalRouteInput,
  posted: URLSearchParams | null,
  selection: PromptSdlcLocalModelSelection,
): Promise<boolean> => {
  const manual =
    posted === null
      ? { kind: "ignored" as const }
      : acceptPromptSdlcLocalManualPost({
          posted,
          storePath: input.storePath,
        });
  if (manual.kind === "ignored") {
    return false;
  }
  if (manual.kind === "saved") {
    ensurePromptSdlcLocalCycleRunning(input.storePath, manual.cycleId);
    input.response.writeHead(303, {
      Location: `/prompt-sdlc?cycle=${encodeURIComponent(manual.cycleId)}`,
    });
    input.response.end();
    return true;
  }
  if (manual.kind === "missing") {
    input.response.writeHead(303, { Location: "/prompt-sdlc" });
    input.response.end();
    return true;
  }

  await sendPromptSdlcLocalPage(input, {
    goal: "",
    prompt: "",
    modelNote: selection.note,
    writers: selection.writers,
    judge: manual.cycle.judgeModel,
    improver: manual.cycle.improverModel,
    folder: "~",
    passScore: String(manual.cycle.passScore),
    maxRounds: String(manual.cycle.maxRounds),
    canRun: selection.canRun,
    errorMessage: manual.errorMessage,
    skillNotice: null,
    cycle: manual.cycle,
    history: readPromptSdlcLocalCycles(input.storePath),
  });
  return true;
};
