import { asRowArray, getSql } from "@/lib/db";
import { nextProjectB2bState } from "@/lib/projects/acl/messaging/nextProjectB2bState";
import type {
  ProjectB2bEvent,
  ProjectB2bState,
} from "@/lib/projects/acl/messaging/projectB2bStateMachine";

/**
 * Move one delivery along the FSA. Illegal transitions are rejected.
 * The update only lands while the row is still in `from`, so a racing
 * caller cannot apply the same transition twice. Returns true when applied.
 */
export const applyProjectB2bTransition = async (input: {
  readonly deliveryId: string;
  readonly from: ProjectB2bState;
  readonly event: ProjectB2bEvent;
  readonly now: Date;
}): Promise<boolean> => {
  const next = nextProjectB2bState(input.from, input.event);
  if (!next.ok) {
    return false;
  }
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      UPDATE project_message_deliveries
      SET b2b_state = ${next.state},
        b2b_state_at = ${input.now.toISOString()}::timestamptz,
        updated_at = NOW()
      WHERE id = ${input.deliveryId}
        AND b2b_state = ${input.from}
      RETURNING id
    `,
  );
  return rows.length > 0;
};
