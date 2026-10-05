import { asRowArray, getSql } from "@/lib/db";
import { listProjectComputerHistoryBacklog } from "@/lib/projects/acl/messaging/listProjectComputerHistoryBacklog";
import { notifyProjectComputerOfMessage } from "@/lib/projects/acl/messaging/notifyProjectComputerOfMessage";
import {
  PROJECT_COMPUTER_HISTORY_UNSAVED_WAKE_KEY_PREFIX,
  PROJECT_COMPUTER_HISTORY_UNSAVED_WAKE_MIN_INTERVAL_MS,
} from "@/lib/projects/acl/messaging/projectComputerHistory.constants";
import { PROJECT_COMPUTER_HISTORY_ON_STATES } from "@/lib/projects/acl/messaging/projectComputerHistoryStateMachine";
import { readProjectComputerHistoryUnsavedOverdue } from "@/lib/projects/acl/messaging/readProjectComputerHistoryUnsavedOverdue";

/**
 * For gated projects with overdue un-acked messages, re-push the oldest
 * backlog row through notifyProjectComputerOfMessage (live hub / dispatch
 * outbox), at most once per PROJECT_COMPUTER_HISTORY_UNSAVED_WAKE_MIN_INTERVAL_MS
 * per project (last_unsaved_wake_at on settings). Never deletes.
 */
export const wakeProjectComputersForUnsavedOverdue = async (input?: {
  readonly now?: Date;
}): Promise<number> => {
  const now = input?.now ?? new Date();
  const sql = getSql();
  const projects = asRowArray(
    await sql`
      SELECT project_id, last_unsaved_wake_at
      FROM project_computer_history_settings
      WHERE state = ANY(${[...PROJECT_COMPUTER_HISTORY_ON_STATES]}::text[])
    `,
  );
  let woken = 0;
  for (const row of projects) {
    const projectId = String(row.project_id);
    const lastWake = row.last_unsaved_wake_at;
    if (lastWake != null) {
      const lastMs = new Date(String(lastWake)).getTime();
      if (
        Number.isFinite(lastMs) &&
        now.getTime() - lastMs <
          PROJECT_COMPUTER_HISTORY_UNSAVED_WAKE_MIN_INTERVAL_MS
      ) {
        continue;
      }
    }
    const overdue = await readProjectComputerHistoryUnsavedOverdue({
      projectId,
    });
    if (overdue === null) {
      continue;
    }
    const backlog = await listProjectComputerHistoryBacklog({
      projectId,
      limit: 1,
    });
    const oldest = backlog[0];
    if (oldest === undefined) {
      continue;
    }
    const dayStamp = Math.floor(
      now.getTime() / PROJECT_COMPUTER_HISTORY_UNSAVED_WAKE_MIN_INTERVAL_MS,
    );
    const result = await notifyProjectComputerOfMessage({
      projectId,
      message: oldest,
      idempotencyKey: `${PROJECT_COMPUTER_HISTORY_UNSAVED_WAKE_KEY_PREFIX}${projectId}:${dayStamp}`,
    });
    if (result === "skipped") {
      continue;
    }
    await sql`
      UPDATE project_computer_history_settings
      SET last_unsaved_wake_at = ${now.toISOString()}
      WHERE project_id = ${projectId}
    `;
    if (result === "delivered" || result === "queued") {
      woken += 1;
    }
  }
  return woken;
};
