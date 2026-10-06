import { ensureProjectComposerRecipientStickySchema } from "@/lib/projects/acl/composer/ensureProjectComposerRecipientStickySchema";
import { deleteProjectComposerRecipientStickyRow } from "@/lib/projects/acl/composer/projectComposerRecipientStickyRepo";
import type { ProjectComposerRecipientStickyDeleteResult } from "@/lib/projects/acl/composer/projectComposerRecipientSticky.types";
import { resolveComposerRecipientStickyActor } from "@/lib/projects/acl/composer/resolveComposerRecipientStickyActor";

/** DELETE / clear sticky when chip unchecked or one-shot. */
export const deleteProjectComposerRecipientSticky = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
}): Promise<ProjectComposerRecipientStickyDeleteResult> => {
  const actor = await resolveComposerRecipientStickyActor(input);
  if (!actor.ok) {
    return actor;
  }
  await ensureProjectComposerRecipientStickySchema();
  const cleared = await deleteProjectComposerRecipientStickyRow(input);
  return { ok: true, cleared };
};
