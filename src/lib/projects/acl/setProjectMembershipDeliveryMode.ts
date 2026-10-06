import { asRowArray, getSql } from "@/lib/db";
import { ensureProjectMembershipDeliveryModeSchema } from "@/lib/projects/acl/ensureProjectMembershipDeliveryModeSchema";
import type { ProjectMembershipDeliveryMode } from "@/lib/projects/acl/membershipDeliveryMode.constant";

/**
 * Write delivery_mode on one active membership of this project.
 * Returns true only when the stored mode changed (no-op writes return false).
 * Invite / device-connect call this at connect; wake-link saves flip to webhook.
 */
export const setProjectMembershipDeliveryMode = async (input: {
  readonly projectId: string;
  readonly membershipId: string;
  readonly deliveryMode: ProjectMembershipDeliveryMode;
}): Promise<boolean> => {
  await ensureProjectMembershipDeliveryModeSchema();
  const rows = asRowArray(
    await getSql()`
      UPDATE project_memberships
      SET delivery_mode = ${input.deliveryMode}::text
      WHERE project_id = ${input.projectId}::text
        AND id = ${input.membershipId}::text
        AND status = 'active'
        AND delivery_mode IS DISTINCT FROM ${input.deliveryMode}::text
      RETURNING id
    `,
  );
  return rows.length > 0;
};

/**
 * Wake link saved → webhook. Never throws: a failed flip must not fail the
 * wake-link save (the default is webhook, so pre-migration rows are already on it).
 */
export const flipProjectMembershipToWebhookOnWakeLink = async (input: {
  readonly projectId: string;
  readonly membershipId: string;
}): Promise<boolean> => {
  try {
    return await setProjectMembershipDeliveryMode({
      ...input,
      deliveryMode: "webhook",
    });
  } catch (error: unknown) {
    console.error("delivery_mode flip on wake link failed", {
      membershipId: input.membershipId,
      error: error instanceof Error ? error.message : "flip_failed",
    });
    return false;
  }
};
