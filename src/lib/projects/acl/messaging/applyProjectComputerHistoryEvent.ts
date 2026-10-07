import { asRowArray, getSql } from "@/lib/db";
import { nextProjectComputerHistoryState } from "@/lib/projects/acl/messaging/nextProjectComputerHistoryState";
import type {
  ProjectComputerHistoryEvent,
  ProjectComputerHistoryState,
} from "@/lib/projects/acl/messaging/projectComputerHistoryStateMachine";
import { readProjectComputerHistoryState } from "@/lib/projects/acl/messaging/readProjectComputerHistoryState";

export type ApplyProjectComputerHistoryEventResult =
  | { readonly ok: true; readonly state: ProjectComputerHistoryState }
  | {
      readonly ok: false;
      readonly code: "illegal_transition";
      readonly state: ProjectComputerHistoryState;
    };

/**
 * Move one project along the history FSA. Illegal transitions are rejected.
 * The write only lands while the row is still in `from` (or missing when
 * `from` is the unset default on_configuring), so a racing caller cannot
 * apply a stale transition.
 */
export const applyProjectComputerHistoryEvent = async (input: {
  readonly projectId: string;
  readonly event: ProjectComputerHistoryEvent;
}): Promise<ApplyProjectComputerHistoryEventResult> => {
  const from = await readProjectComputerHistoryState(input.projectId);
  const next = nextProjectComputerHistoryState(from, input.event);
  if (!next.ok) {
    return { ok: false, code: "illegal_transition", state: from };
  }
  if (next.state === from) {
    return { ok: true, state: from };
  }
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      INSERT INTO project_computer_history_settings (project_id, state)
      VALUES (${input.projectId}, ${next.state})
      ON CONFLICT (project_id) DO UPDATE SET
        state = EXCLUDED.state,
        state_changed_at = NOW()
      WHERE project_computer_history_settings.state = ${from}
      RETURNING state
    `,
  );
  if (rows.length === 0) {
    const current = await readProjectComputerHistoryState(input.projectId);
    return { ok: false, code: "illegal_transition", state: current };
  }
  return { ok: true, state: next.state };
};
