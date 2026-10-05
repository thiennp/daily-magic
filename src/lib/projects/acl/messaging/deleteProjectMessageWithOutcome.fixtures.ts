/** Read message row (with live wake result) as loaded before delete-on-read. */
export const DELETE_ON_READ_MESSAGE_ROW = {
  id: "msg-1",
  project_id: "proj-1",
  kind: "task.assign",
  to_user_id: "bot-1",
  to_membership_id: "mem-1",
  created_at: "2026-10-05T07:00:00.000Z",
  read_at: "2026-10-05T08:00:00.000Z",
  grok_wake_result: "http_200",
} as const;

/** Outcome row written for DELETE_ON_READ_MESSAGE_ROW with a done delivery. */
export const DELETE_ON_READ_EXPECTED_OUTCOME = {
  message_id: "msg-1",
  project_id: "proj-1",
  recipient_user_id: "bot-1",
  recipient_membership_id: "mem-1",
  final_b2b_state: "done",
  grok_wake_result: "http_200",
  deleted_reason: "delete_on_read",
} as const;
