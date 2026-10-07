/** loadProjectMessengerNeonThreadPage.notices.test DB rows (newest first). */
export const NOTICE_PAGE_KAI = "11111111-1111-4111-8111-111111111111";
export const NOTICE_PAGE_TASK = "33333333-3333-4333-8333-333333333333";
export const NOTICE_PAGE_OWNER = "owner-1";

const row = (over: Record<string, unknown>) => ({
  summary: "",
  created_at: "2026-10-07T19:00:00.000Z",
  sender_membership_id: null,
  sender_user_id: NOTICE_PAGE_OWNER,
  to_membership_id: null,
  to_user_id: null,
  to_team_label: null,
  sender_display_name: null,
  sender_member_kind: null,
  recipient_member_kind: null,
  recipient_display_name: null,
  archived_at: null,
  archived_by: null,
  archived_by_display_name: null,
  ...over,
});

export const NOTICE_PAGE_DB_ROWS = [
  row({
    id: "notice-1",
    kind: "composer.recipient_sticky_cleared",
    summary: "Recipient sticky cleared: Kai left the project.",
    created_at: "2026-10-07T19:02:00.000Z",
    cursor_at: "2026-10-07T19:02:00.000000Z",
    to_user_id: NOTICE_PAGE_OWNER,
  }),
  row({
    id: NOTICE_PAGE_TASK,
    kind: "chat.note",
    summary: "hello everyone",
    cursor_at: "2026-10-07T19:00:00.000000Z",
    archived_at: "2026-10-07T19:05:00.000Z",
    archived_by: NOTICE_PAGE_OWNER,
  }),
];
