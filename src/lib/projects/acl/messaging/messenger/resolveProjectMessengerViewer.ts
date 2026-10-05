import { decideProjectMessengerSender } from "@/lib/projects/acl/messaging/messenger/decideProjectMessengerSender";
import { resolveOwnerOrActiveHumanSeat } from "@/lib/projects/acl/resolveOwnerOrActiveHumanSeat";

export type ProjectMessengerViewer =
  | {
      readonly ok: true;
      readonly projectId: string;
      readonly ownerUserId: string;
      readonly viewerUserId: string;
      readonly canSend: boolean;
    }
  | { readonly ok: false; readonly code: "not_found" | "forbidden" };

/**
 * Read gate: owner or active human member|viewer (all may read every thread).
 * canSend = the send gate would pass (viewers read-only).
 */
export const resolveProjectMessengerViewer = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
}): Promise<ProjectMessengerViewer> => {
  const access = await resolveOwnerOrActiveHumanSeat(input);
  if (!access.ok) {
    return access;
  }
  return {
    ok: true,
    projectId: input.projectId,
    ownerUserId: access.project.ownerUserId,
    viewerUserId: input.actorUserId,
    canSend: decideProjectMessengerSender({
      isOwner: access.kind === "owner",
      seat: access.membership,
    }).ok,
  };
};
