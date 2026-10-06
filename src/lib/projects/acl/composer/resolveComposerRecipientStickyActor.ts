import { decideProjectMessengerSender } from "@/lib/projects/acl/messaging/messenger/decideProjectMessengerSender";
import { resolveOwnerOrActiveHumanSeat } from "@/lib/projects/acl/resolveOwnerOrActiveHumanSeat";

export type ComposerRecipientStickyActor =
  | {
      readonly ok: true;
      readonly projectId: string;
      readonly actorUserId: string;
      readonly ownerUserId: string;
    }
  | {
      readonly ok: false;
      readonly code: "not_found" | "forbidden" | "viewer_read_only";
    };

/**
 * Sticky is a composer preference: owner or human member who may send.
 * Viewers read messenger but cannot lock a send sticky.
 */
export const resolveComposerRecipientStickyActor = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
}): Promise<ComposerRecipientStickyActor> => {
  const access = await resolveOwnerOrActiveHumanSeat(input);
  if (!access.ok) {
    return access;
  }
  const send = decideProjectMessengerSender({
    isOwner: access.kind === "owner",
    seat: access.membership,
  });
  if (!send.ok) {
    return {
      ok: false,
      code: send.code === "viewer_read_only" ? "viewer_read_only" : "forbidden",
    };
  }
  return {
    ok: true,
    projectId: input.projectId,
    actorUserId: input.actorUserId,
    ownerUserId: access.project.ownerUserId,
  };
};
