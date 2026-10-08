import { getUserProjectById } from "@/lib/projects/userProjectQueries";

import {
  lookupDisplayNameRecipients,
  type DispatchRecipient,
} from "@/lib/projects/acl/messaging/lookupDispatchMembershipRecipients";
import { resolveMembershipIdDispatchRecipient } from "@/lib/projects/acl/messaging/resolveMembershipIdDispatchRecipient";

export type { DispatchRecipient };

const requireExactlyOneRecipient = (
  recipients: readonly DispatchRecipient[],
):
  | { readonly ok: true; readonly recipients: readonly DispatchRecipient[] }
  | {
      readonly ok: false;
      readonly code: "recipient_not_found" | "single_recipient_required";
    } => {
  if (recipients.length === 0) {
    return { ok: false, code: "recipient_not_found" };
  }
  if (recipients.length > 1) {
    return { ok: false, code: "single_recipient_required" };
  }
  return { ok: true, recipients };
};

export const resolveDispatchRecipients = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly toMembershipId?: string | null;
  readonly toProjectDisplayName: string | null;
}): Promise<
  | { readonly ok: true; readonly recipients: readonly DispatchRecipient[] }
  | {
      readonly ok: false;
      readonly code: "recipient_not_found" | "single_recipient_required";
    }
> => {
  if (input.toMembershipId) {
    return resolveMembershipIdDispatchRecipient({
      projectId: input.projectId,
      actorUserId: input.actorUserId,
      toMembershipId: input.toMembershipId,
    });
  }
  if (input.toProjectDisplayName?.trim().toLowerCase() === "owner") {
    const project = await getUserProjectById(input.projectId);
    if (project === null || project.ownerUserId === input.actorUserId) {
      return { ok: false, code: "recipient_not_found" };
    }
    return {
      ok: true,
      recipients: [{ id: null, user_id: project.ownerUserId }],
    };
  }
  if (input.toProjectDisplayName) {
    return requireExactlyOneRecipient(
      await lookupDisplayNameRecipients({
        projectId: input.projectId,
        actorUserId: input.actorUserId,
        toProjectDisplayName: input.toProjectDisplayName,
      }),
    );
  }
  return { ok: false, code: "recipient_not_found" };
};
