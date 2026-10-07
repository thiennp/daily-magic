import { sendHumanProjectEmailInvite } from "@/lib/projects/acl/humanInvites/sendHumanProjectEmailInvite";

/** Shared DB row for sendHumanProjectEmailInvite tests (108 columns). */
export const SEND_EMAIL_INVITE_TEST_ROW = {
  id: "inv-1",
  project_id: "proj-1",
  created_by_user_id: "owner-1",
  token_hash: "hash(22)",
  email: "ada@example.org",
  require_email_match: false,
  role: "member",
  max_uses: 1,
  uses_remaining: 1,
  expires_at: "2026-10-14T00:00:00.000Z",
  revoked_at: null,
  redeemed_at: null,
  redeemed_by_user_id: null,
  created_at: "2026-10-07T00:00:00.000Z",
  status: "pending",
  delivery: "email",
  requires_approval: true,
  email_sent_at: null,
};

type MockFn = {
  mockResolvedValue: (v: unknown) => unknown;
  mockReturnValue: (v: unknown) => unknown;
};

/** Happy-path defaults for the hoisted mocks in sendHumanProjectEmailInvite tests. */
export const primeSendInviteMocks = (m: {
  readonly authorize: MockFn;
  readonly configured: MockFn;
  readonly getUser: MockFn;
  readonly getProject: MockFn;
  readonly sqlMock: MockFn;
  readonly sendEmail: MockFn;
  readonly helpers: {
    readonly countRecentHumanEmailInvites: MockFn;
    readonly markHumanEmailInviteSent: MockFn;
  };
}): void => {
  m.authorize.mockResolvedValue({ allow: true });
  m.configured.mockReturnValue(true);
  m.getUser.mockResolvedValue({
    id: "owner-1",
    email: "owner@example.org",
    name: "Thien",
  });
  m.getProject.mockResolvedValue({
    id: "proj-1",
    name: "Moon base",
    ownerUserId: "owner-1",
  });
  m.helpers.countRecentHumanEmailInvites.mockResolvedValue(0);
  m.helpers.markHumanEmailInviteSent.mockResolvedValue({
    ...SEND_EMAIL_INVITE_TEST_ROW,
    email_sent_at: "2026-10-07T00:00:01.000Z",
  });
  m.sqlMock.mockResolvedValue([SEND_EMAIL_INVITE_TEST_ROW]);
  m.sendEmail.mockResolvedValue({ ok: true });
};

/** Owner sends to a messy-cased address (normalized server-side). */
export const callSendEmailInvite = (over: Record<string, unknown> = {}) =>
  sendHumanProjectEmailInvite({
    projectId: "proj-1",
    ownerUserId: "owner-1",
    email: "  Ada@Example.org ",
    ...over,
  });
