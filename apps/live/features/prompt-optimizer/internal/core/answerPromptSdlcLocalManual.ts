import { acceptPromptSdlcLocalManualPost } from "./acceptPromptSdlcLocalManualPost";
import { buildPromptSdlcLiveRunFragmentHtml } from "./buildPromptSdlcLiveRunFragmentHtml";
import { sendPromptSdlcLocalPage } from "./sendPromptSdlcLocalPage";
import type { PromptSdlcLocalModelSelection } from "./promptSdlcLocalForm";
import {
  readPromptSdlcLocalCycle,
  readPromptSdlcLocalCycles,
} from "./promptSdlcLocalStore";
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
    const cycle = readPromptSdlcLocalCycle(input.storePath, manual.cycleId);
    ensurePromptSdlcLocalCycleRunning(input.storePath, manual.cycleId);
    const liveFragment = posted?.get("liveFragment") === "1";
    if (liveFragment && cycle !== null) {
      input.response.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Prompt-Sdlc-Cycle-Id": cycle.id,
      });
      input.response.end(
        buildPromptSdlcLiveRunFragmentHtml(input.storePath, cycle),
      );
      return true;
    }
    input.response.writeHead(303, {
      Location: `/prompt-optimizer?cycle=${encodeURIComponent(manual.cycleId)}`,
    });
    input.response.end();
    return true;
  }
  if (manual.kind === "missing") {
    input.response.writeHead(303, { Location: "/prompt-optimizer" });
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
    resumableWizardCycle: null,
  });
  return true;
};
