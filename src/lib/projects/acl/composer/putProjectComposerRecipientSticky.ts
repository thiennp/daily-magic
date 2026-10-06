import { ensureProjectComposerRecipientStickySchema } from "@/lib/projects/acl/composer/ensureProjectComposerRecipientStickySchema";
import { isActiveComposerRecipientStickyMembership } from "@/lib/projects/acl/composer/isActiveComposerRecipientStickyMembership";
import { loadActiveComposerRecipientAssistants } from "@/lib/projects/acl/composer/loadActiveComposerRecipientAssistants";
import {
  PROJECT_COMPOSER_RECIPIENT_STICKY_MODES,
  type ProjectComposerRecipientStickyMode,
} from "@/lib/projects/acl/composer/projectComposerRecipientSticky.constants";
import { upsertProjectComposerRecipientStickyRow } from "@/lib/projects/acl/composer/projectComposerRecipientStickyRepo";
import type { ProjectComposerRecipientStickyPutResult } from "@/lib/projects/acl/composer/projectComposerRecipientSticky.types";
import { resolveComposerRecipientStickyActor } from "@/lib/projects/acl/composer/resolveComposerRecipientStickyActor";

const parseMode = (raw: unknown): ProjectComposerRecipientStickyMode | null => {
  if (typeof raw !== "string") return null;
  return (PROJECT_COMPOSER_RECIPIENT_STICKY_MODES as readonly string[]).includes(
    raw,
  )
    ? (raw as ProjectComposerRecipientStickyMode)
    : null;
};

/** PUT sticky while chip checked. Rejects inactive seats and one-assistant projects. */
export const putProjectComposerRecipientSticky = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly body: unknown;
}): Promise<ProjectComposerRecipientStickyPutResult> => {
  const actor = await resolveComposerRecipientStickyActor(input);
  if (!actor.ok) {
    return actor;
  }
  const body =
    input.body !== null && typeof input.body === "object"
      ? (input.body as Record<string, unknown>)
      : null;
  if (body === null) {
    return { ok: false, code: "invalid_body" };
  }
  const mode = parseMode(body.mode);
  if (mode === null) {
    return { ok: false, code: "invalid_body" };
  }
  const membershipIdRaw = body.membershipId;
  const membershipId =
    typeof membershipIdRaw === "string" && membershipIdRaw.trim().length > 0
      ? membershipIdRaw.trim()
      : null;

  if (mode === "all") {
    if (membershipId !== null) {
      return { ok: false, code: "invalid_body" };
    }
  } else if (membershipId === null) {
    return { ok: false, code: "invalid_body" };
  }

  await ensureProjectComposerRecipientStickySchema();
  const assistants = await loadActiveComposerRecipientAssistants(
    input.projectId,
  );
  if (assistants.length === 1) {
    // One-assistant: no sticky chip — hide ALL routing UI.
    return { ok: false, code: "single_assistant" };
  }

  if (mode === "membership" && membershipId !== null) {
    const active = await isActiveComposerRecipientStickyMembership({
      projectId: input.projectId,
      membershipId,
    });
    if (!active) {
      return { ok: false, code: "membership_inactive" };
    }
  }

  const sticky = await upsertProjectComposerRecipientStickyRow({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
    mode,
    membershipId: mode === "all" ? null : membershipId,
  });
  return { ok: true, sticky };
};
