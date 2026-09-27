import { applyPromptSdlcReply } from "@/lib/promptSdlc/applyPromptSdlcReply";
import { claimPromptSdlcLocalCall } from "@/lib/promptSdlc/claimPromptSdlcCycleStep";
import { loadPromptSdlcCycleView } from "@/lib/promptSdlc/loadPromptSdlcCycleView";
import { getPromptSdlcCycleForOwner } from "@/lib/promptSdlc/promptSdlcCycleQueries";
import type { PromptSdlcCallRole } from "@/lib/promptSdlc/types/PromptSdlcModelChoice.type";
import type PromptSdlcCycleView from "@/lib/promptSdlc/types/PromptSdlcCycleView.type";

export type SubmitPromptSdlcLocalResult =
  | { readonly ok: true; readonly cycle: PromptSdlcCycleView }
  | {
      readonly ok: false;
      readonly status: number;
      readonly errorMessage: string;
    };

export const submitPromptSdlcLocalResult = async (input: {
  readonly cycleId: string;
  readonly ownerUserId: string;
  readonly requesterEmail: string | null;
  readonly role: PromptSdlcCallRole;
  readonly text: string;
}): Promise<SubmitPromptSdlcLocalResult> => {
  const cycle = await getPromptSdlcCycleForOwner(
    input.cycleId,
    input.ownerUserId,
  );
  if (cycle === null) {
    return { ok: false, status: 404, errorMessage: "Prompt cycle not found." };
  }

  if (
    cycle.status !== "awaiting_local" ||
    cycle.pendingLocalRole !== input.role
  ) {
    const current = await loadPromptSdlcCycleView(
      input.cycleId,
      input.ownerUserId,
    );
    if (current === null) {
      return {
        ok: false,
        status: 404,
        errorMessage: "Prompt cycle not found.",
      };
    }
    return { ok: true, cycle: current };
  }

  const claimed = await claimPromptSdlcLocalCall({
    cycleId: cycle.id,
    ownerUserId: cycle.ownerUserId,
    role: input.role,
  });
  if (!claimed) {
    const current = await loadPromptSdlcCycleView(
      input.cycleId,
      input.ownerUserId,
    );
    if (current === null) {
      return {
        ok: false,
        status: 404,
        errorMessage: "Prompt cycle not found.",
      };
    }
    return { ok: true, cycle: current };
  }

  await applyPromptSdlcReply({
    cycle,
    role: input.role,
    raw: input.text,
    requesterEmail: input.requesterEmail,
  });

  const view = await loadPromptSdlcCycleView(input.cycleId, input.ownerUserId);
  if (view === null) {
    return { ok: false, status: 404, errorMessage: "Prompt cycle not found." };
  }

  return { ok: true, cycle: view };
};
