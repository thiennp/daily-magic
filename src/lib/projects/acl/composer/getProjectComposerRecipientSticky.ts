import {
  clearInactiveComposerRecipientStickyOnGet,
  clearLeftoverComposerRecipientStickyForSingleAssistant,
} from "@/lib/projects/acl/composer/clearComposerRecipientStickyOnGet";
import { ensureProjectComposerRecipientStickySchema } from "@/lib/projects/acl/composer/ensureProjectComposerRecipientStickySchema";
import { loadActiveComposerRecipientAssistants } from "@/lib/projects/acl/composer/loadActiveComposerRecipientAssistants";
import { loadProjectComposerRecipientStickyRow } from "@/lib/projects/acl/composer/projectComposerRecipientStickyRepo";
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

  const loaded = await loadProjectComposerRecipientStickyRow(input);
  const afterInactive = await clearInactiveComposerRecipientStickyOnGet({
    ...input,
    sticky: loaded,
    assistants,
  });
  const afterSingle =
    await clearLeftoverComposerRecipientStickyForSingleAssistant({
      ...input,
      sticky: afterInactive.sticky,
      singleAssistant,
      prior: afterInactive,
    });

  return {
    ok: true,
    sticky: afterSingle.sticky,
    cleared: afterSingle.cleared,
    clearedReason: afterSingle.clearedReason,
    singleAssistant,
  };
};
