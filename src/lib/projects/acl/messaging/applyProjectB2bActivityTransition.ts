import { asRowArray, getSql } from "@/lib/db";
import { nextProjectB2bState } from "@/lib/projects/acl/messaging/nextProjectB2bState";
import {
  PROJECT_B2B_TIMER_RESET_STATES,
  type ProjectB2bEvent,
  type ProjectB2bState,
} from "@/lib/projects/acl/messaging/projectB2bStateMachine";

/**
 * One conditional write for B's activity: move state and, when the target
 * restarts the silence clock, set last_activity_at in the same UPDATE.
 */
export const applyProjectB2bActivityTransition = async (input: {
  readonly deliveryId: string;
  readonly from: ProjectB2bState;
  readonly event: ProjectB2bEvent;
  readonly now: Date;
}): Promise<boolean> => {
  const next = nextProjectB2bState(input.from, input.event);
  if (!next.ok) {
    return false;
  }
  const resetTimer = PROJECT_B2B_TIMER_RESET_STATES.includes(next.state);
  const at = input.now.toISOString();
  const sql = getSql();
  const rows = asRowArray(
    resetTimer
      ? await sql`
          UPDATE project_message_deliveries
          SET b2b_state = ${next.state},
            b2b_state_at = ${at}::timestamptz,
            last_activity_at = ${at}::timestamptz,
            updated_at = NOW()
          WHERE id = ${input.deliveryId}
            AND b2b_state = ${input.from}
          RETURNING id
        `
      : await sql`
          UPDATE project_message_deliveries
          SET b2b_state = ${next.state},
            b2b_state_at = ${at}::timestamptz,
            updated_at = NOW()
          WHERE id = ${input.deliveryId}
            AND b2b_state = ${input.from}
          RETURNING id
        `,
  );
  return rows.length > 0;
};
