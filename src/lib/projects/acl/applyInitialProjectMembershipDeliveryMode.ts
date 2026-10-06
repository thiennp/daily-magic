import { asRowArray, getSql } from "@/lib/db";
import { ensureProjectMembershipDeliveryModeSchema } from "@/lib/projects/acl/ensureProjectMembershipDeliveryModeSchema";
import { parseProjectInvitePlatform } from "@/lib/projects/acl/invites/projectInvitePlatform.constant";
import {
  PROJECT_MEMBERSHIP_DELIVERY_MODE_DEFAULT,
  type ProjectMembershipDeliveryMode,
} from "@/lib/projects/acl/membershipDeliveryMode.constant";
import { resolveInitialProjectMembershipDeliveryMode } from "@/lib/projects/acl/resolveInitialProjectMembershipDeliveryMode";
import { setProjectMembershipDeliveryMode } from "@/lib/projects/acl/setProjectMembershipDeliveryMode";
import { loadProjectMemberWakeLinkSet } from "@/lib/projects/acl/webhooks/loadProjectMemberWakeLinkSet";

const loadInvitePlatform = async (
  inviteId: string | null,
): Promise<string | null> => {
  if (inviteId === null) return null;
  const rows = asRowArray(
    await getSql()`
      SELECT platform FROM project_invites WHERE id = ${inviteId}::text LIMIT 1
    `,
  );
  return parseProjectInvitePlatform(rows[0]?.platform);
};

/**
 * Join: pick the connect-time delivery_mode (redeem joinType, else invite
 * platform, + wake link) and
 * write it on the just-activated membership. Never throws — a failed write
 * must not fail the join; the row keeps the column default (webhook).
 */
export const applyInitialProjectMembershipDeliveryMode = async (input: {
  readonly projectId: string;
  readonly membershipId: string;
  readonly inviteId: string | null;
  /** Redeeming assistant's own join type (076); wins over the invite platform. */
  readonly joinPlatform?: string | null;
}): Promise<ProjectMembershipDeliveryMode> => {
  try {
    await ensureProjectMembershipDeliveryModeSchema();
    const [platform, links] = await Promise.all([
      input.joinPlatform
        ? Promise.resolve(input.joinPlatform)
        : loadInvitePlatform(input.inviteId),
      loadProjectMemberWakeLinkSet({
        projectId: input.projectId,
        membershipIds: [input.membershipId],
      }),
    ]);
    const deliveryMode = resolveInitialProjectMembershipDeliveryMode({
      platform,
      hasWakeLink: links.get(input.membershipId) === true,
    });
    await setProjectMembershipDeliveryMode({
      projectId: input.projectId,
      membershipId: input.membershipId,
      deliveryMode,
    });
    return deliveryMode;
  } catch (error: unknown) {
    console.error("initial delivery_mode on join failed", {
      membershipId: input.membershipId,
      error: error instanceof Error ? error.message : "apply_failed",
    });
    return PROJECT_MEMBERSHIP_DELIVERY_MODE_DEFAULT;
  }
};
