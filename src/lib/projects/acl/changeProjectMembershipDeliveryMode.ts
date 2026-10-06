import { asRowArray, getSql } from "@/lib/db";
import { ensureProjectMembershipDeliveryModeSchema } from "@/lib/projects/acl/ensureProjectMembershipDeliveryModeSchema";
import {
  PROJECT_MEMBERSHIP_DELIVERY_MODES,
  type ProjectMembershipDeliveryMode,
} from "@/lib/projects/acl/membershipDeliveryMode.constant";
import { formatProjectDeliveryModeActivity } from "@/lib/projects/acl/projectMembershipDeliveryModeActivity.constant";
import { setProjectMembershipDeliveryMode } from "@/lib/projects/acl/setProjectMembershipDeliveryMode";
import { loadProjectMemberWakeLinkSet } from "@/lib/projects/acl/webhooks/loadProjectMemberWakeLinkSet";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";

export type ChangeProjectMembershipDeliveryModeResult =
  | {
      readonly ok: true;
      readonly membershipId: string;
      readonly deliveryMode: ProjectMembershipDeliveryMode;
      readonly changed: boolean;
      readonly activity: string;
    }
  | {
      readonly ok: false;
      readonly code:
        "invalid_delivery_mode" | "not_found" | "wake_link_required";
    };

const parseStrict = (value: unknown): ProjectMembershipDeliveryMode | null =>
  PROJECT_MEMBERSHIP_DELIVERY_MODES.find((mode) => mode === value) ?? null;

/**
 * Owner (member_row, role=member) or member self (own_membership) switch,
 * no re-invite. webhook needs a stored wake link; poll is always allowed.
 */
export const changeProjectMembershipDeliveryMode = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly target:
    | { readonly by: "member_row"; readonly membershipId: string }
    | { readonly by: "own_membership" };
  readonly deliveryMode: unknown;
}): Promise<ChangeProjectMembershipDeliveryModeResult> => {
  const deliveryMode = parseStrict(input.deliveryMode);
  if (deliveryMode === null) {
    return { ok: false, code: "invalid_delivery_mode" };
  }
  await ensureProjectMembershipDeliveryModeSchema();
  const byRow = input.target.by === "member_row";
  const rowId = byRow
    ? (input.target as { membershipId: string }).membershipId
    : "";
  const rows = asRowArray(
    await getSql()`
      SELECT id, project_display_name
      FROM project_memberships
      WHERE project_id = ${input.projectId}::text
        AND status = 'active'
        AND (
          (${byRow}::boolean AND id = ${rowId}::text AND role = 'member')
          OR (NOT ${byRow}::boolean AND user_id = ${input.actorUserId}::text)
        )
      LIMIT 1
    `,
  );
  const row = rows[0];
  if (row === undefined) {
    return { ok: false, code: "not_found" };
  }
  const membershipId = String(row.id);
  if (deliveryMode === "webhook") {
    const flags = await loadProjectMemberWakeLinkSet({
      projectId: input.projectId,
      membershipIds: [membershipId],
    });
    if (flags.get(membershipId) !== true) {
      return { ok: false, code: "wake_link_required" };
    }
  }
  const changed = await setProjectMembershipDeliveryMode({
    projectId: input.projectId,
    membershipId,
    deliveryMode,
  });
  const activity = formatProjectDeliveryModeActivity({
    by: byRow ? "owner" : "member",
    deliveryMode,
    name: row.project_display_name ? String(row.project_display_name) : null,
  });
  if (changed) {
    await writeProjectAccessAudit({
      projectId: input.projectId,
      actorUserId: input.actorUserId,
      action: "membership.delivery_mode",
      detail: { membershipId, deliveryMode, activity },
    });
  }
  return { ok: true, membershipId, deliveryMode, changed, activity };
};
