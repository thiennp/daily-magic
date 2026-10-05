import { asRowArray, getSql } from "@/lib/db";
import type { ProjectB2bState } from "@/lib/projects/acl/messaging/projectB2bStateMachine";

/**
 * Restart the silence clock at B's activity time. Lands only while the row is
 * still in `from`. `now` comes from the caller; no clock is read here.
 */
export const resetProjectB2bSilenceTimer = async (input: {
  readonly deliveryId: string;
  readonly from: ProjectB2bState;
  readonly now: Date;
}): Promise<boolean> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      UPDATE project_message_deliveries
      SET last_activity_at = ${input.now.toISOString()}::timestamptz,
        updated_at = NOW()
      WHERE id = ${input.deliveryId}
        AND b2b_state = ${input.from}
      RETURNING id
    `,
  );
  return rows.length > 0;
};
