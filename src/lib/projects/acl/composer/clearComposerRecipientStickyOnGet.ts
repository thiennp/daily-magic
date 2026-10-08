import { notifyComposerRecipientStickyCleared } from "@/lib/projects/acl/composer/notifyComposerRecipientStickyCleared";
import { deleteProjectComposerRecipientStickyRow } from "@/lib/projects/acl/composer/projectComposerRecipientStickyRepo";
import type { ProjectComposerRecipientStickyRecord } from "@/lib/projects/acl/composer/projectComposerRecipientSticky.types";

type AssistantSeat = {
  readonly membershipId: string;
  readonly displayName: string | null;
};

export type ComposerStickyGetClearState = {
  readonly sticky: ProjectComposerRecipientStickyRecord | null;
  readonly cleared: boolean;
  readonly clearedReason: "membership_inactive" | "single_assistant" | null;
};

/** Clear sticky when membership seat left; notify best-effort. */
export const clearInactiveComposerRecipientStickyOnGet = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly sticky: ProjectComposerRecipientStickyRecord | null;
  readonly assistants: readonly AssistantSeat[];
}): Promise<ComposerStickyGetClearState> => {
  const sticky = input.sticky;
  if (sticky === null) {
    return { sticky, cleared: false, clearedReason: null };
  }
  if (sticky.mode === "all") {
    await deleteProjectComposerRecipientStickyRow(input);
    return {
      sticky: null,
      cleared: true,
      clearedReason: "membership_inactive",
    };
  }
  if (sticky.mode !== "membership" || sticky.membershipId === null) {
    return { sticky, cleared: false, clearedReason: null };
  }
  const stillActive = input.assistants.some(
    (seat) => seat.membershipId === sticky.membershipId,
  );
  if (stillActive) {
    return { sticky, cleared: false, clearedReason: null };
  }
  const leftId = sticky.membershipId;
  await deleteProjectComposerRecipientStickyRow(input);
  try {
    await notifyComposerRecipientStickyCleared({
      projectId: input.projectId,
      actorUserId: input.actorUserId,
      leftMembershipId: leftId,
      leftDisplayName: null,
    });
  } catch (error) {
    console.error("composer sticky cleared notice failed on GET", {
      projectId: input.projectId,
      membershipId: leftId,
      error,
    });
  }
  return {
    sticky: null,
    cleared: true,
    clearedReason: "membership_inactive",
  };
};

/** One-assistant projects drop leftover sticky (no routing chrome). */
export const clearLeftoverComposerRecipientStickyForSingleAssistant =
  async (input: {
    readonly projectId: string;
    readonly actorUserId: string;
    readonly sticky: ProjectComposerRecipientStickyRecord | null;
    readonly singleAssistant: {
      readonly membershipId: string;
      readonly displayName: string | null;
    } | null;
    readonly prior: ComposerStickyGetClearState;
  }): Promise<ComposerStickyGetClearState> => {
    if (input.singleAssistant === null || input.sticky === null) {
      return {
        sticky: input.sticky,
        cleared: input.prior.cleared,
        clearedReason: input.prior.clearedReason,
      };
    }
    await deleteProjectComposerRecipientStickyRow(input);
    return {
      sticky: null,
      cleared: true,
      clearedReason: "single_assistant",
    };
  };
