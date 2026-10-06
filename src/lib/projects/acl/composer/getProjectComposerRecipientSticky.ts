import { ensureProjectComposerRecipientStickySchema } from "@/lib/projects/acl/composer/ensureProjectComposerRecipientStickySchema";
import { loadActiveComposerRecipientAssistants } from "@/lib/projects/acl/composer/loadActiveComposerRecipientAssistants";
import { notifyComposerRecipientStickyCleared } from "@/lib/projects/acl/composer/notifyComposerRecipientStickyCleared";
import {
  deleteProjectComposerRecipientStickyRow,
  loadProjectComposerRecipientStickyRow,
} from "@/lib/projects/acl/composer/projectComposerRecipientStickyRepo";
import type { ProjectComposerRecipientStickyGetResult } from "@/lib/projects/acl/composer/projectComposerRecipientSticky.types";
import { resolveComposerRecipientStickyActor } from "@/lib/projects/acl/composer/resolveComposerRecipientStickyActor";

/** GET sticky: validate membership; auto-clear inactive; expose one-assistant. */
export const getProjectComposerRecipientSticky = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
}): Promise<ProjectComposerRecipientStickyGetResult> => {
  const actor = await resolveComposerRecipientStickyActor(input);
  if (!actor.ok) {
    return actor;
  }
  await ensureProjectComposerRecipientStickySchema();
  const assistants = await loadActiveComposerRecipientAssistants(
    input.projectId,
  );
  const singleAssistant =
    assistants.length === 1
      ? {
          membershipId: assistants[0].membershipId,
          displayName: assistants[0].displayName,
        }
      : null;

  let sticky = await loadProjectComposerRecipientStickyRow(input);
  let cleared = false;
  let clearedReason: "membership_inactive" | "single_assistant" | null = null;

  if (sticky !== null && sticky.mode === "membership" && sticky.membershipId) {
    const stillActive = assistants.some(
      (seat) => seat.membershipId === sticky!.membershipId,
    );
    if (!stillActive) {
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
      sticky = null;
      cleared = true;
      clearedReason = "membership_inactive";
    }
  }

  // One-assistant: no routing chrome — drop any leftover sticky row.
  if (singleAssistant !== null && sticky !== null) {
    await deleteProjectComposerRecipientStickyRow(input);
    sticky = null;
    cleared = true;
    clearedReason = "single_assistant";
  }

  return {
    ok: true,
    sticky,
    cleared,
    clearedReason,
    singleAssistant,
  };
};
