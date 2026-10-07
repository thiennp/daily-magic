import { beforeEach, describe, expect, it, vi } from "vitest";

const authorize = vi.hoisted(() => vi.fn());
const sqlMock = vi.hoisted(() => vi.fn());
const sendEmail = vi.hoisted(() => vi.fn());
const configured = vi.hoisted(() => vi.fn());
const getUser = vi.hoisted(() => vi.fn());
const getProject = vi.hoisted(() => vi.fn());
const helpers = vi.hoisted(() => ({
  expireStaleHumanEmailInvites: vi.fn(),
  countRecentHumanEmailInvites: vi.fn(),
  retireUnsentHumanEmailInvite: vi.fn(),
  markHumanEmailInviteSent: vi.fn(),
}));
const logCreated = vi.hoisted(() => vi.fn());

vi.mock("@/lib/projects/acl/authorizeProjectOwner", () => ({
  authorizeProjectOwner: authorize,
}));
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));
vi.mock("@/lib/projects/acl/ensureProjectAclSchema", () => ({
  ensureProjectAclSchema: vi.fn(async () => undefined),
}));
vi.mock("@/lib/projects/acl/humanInvites/buildHumanInviteUrl", () => ({
  buildHumanInviteUrl: (token: string) =>
    `https://www.agentwitch.com/invite/h/${token}`,
}));
vi.mock("@/lib/projects/acl/humanInvites/hashHumanInviteToken", () => ({
  createHumanInviteToken: () => "SECRETTOKEN-0123456789",
  hashHumanInviteToken: (token: string) => `hash(${token.length})`,
}));
vi.mock("@/lib/email/sendHumanInviteEmail", () => ({ default: sendEmail }));
vi.mock("@/lib/email/isHumanInviteEmailConfigured", () => ({
  default: configured,
}));
vi.mock("@/lib/auth/userRepository", () => ({ getUserById: getUser }));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: getProject,
}));
vi.mock("@/lib/projects/acl/humanInvites/humanInviteEmailSql", () => helpers);
vi.mock("@/lib/projects/acl/humanInvites/logHumanInviteActivity", () => ({
  logHumanInviteCreated: logCreated,
}));

import {
  callSendEmailInvite as call,
  primeSendInviteMocks,
} from "@/lib/projects/acl/humanInvites/sendHumanEmailInviteTestFixtures";

describe("sendHumanProjectEmailInvite send (DF-025)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    primeSendInviteMocks({
      authorize,
      configured,
      getUser,
      getProject,
      sqlMock,
      sendEmail,
      helpers,
    });
  });

  it("dedupes an open invite to the same email (unique index)", async () => {
    sqlMock.mockRejectedValue(
      new Error(
        'duplicate key value violates unique constraint "project_human_invites_open_email_unique_idx"',
      ),
    );
    expect(await call()).toEqual({ ok: false, code: "already_invited" });
    expect(helpers.expireStaleHumanEmailInvites).toHaveBeenCalledWith({
      projectId: "proj-1",
      email: "ada@example.org",
    });
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("send failure retires the row and returns email_send_failed", async () => {
    sendEmail.mockResolvedValue({ ok: false, code: "email_send_failed" });
    expect(await call()).toEqual({ ok: false, code: "email_send_failed" });
    expect(helpers.retireUnsentHumanEmailInvite).toHaveBeenCalledWith("inv-1");
    expect(logCreated).not.toHaveBeenCalled();
  });

  it("success: hashes the token, emails the link, returns no token", async () => {
    const result = await call();
    const insertValues = sqlMock.mock.calls[0].slice(1);
    expect(insertValues).toContain("hash(22)");
    expect(insertValues).toContain("ada@example.org");
    expect(insertValues).not.toContain("SECRETTOKEN-0123456789");
    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "ada@example.org",
        url: "https://www.agentwitch.com/invite/h/SECRETTOKEN-0123456789",
        inviterName: "Thien",
        projectName: "Moon base",
        requiresApproval: true,
        expiresInDays: 7,
      }),
    );
    expect(JSON.stringify(result)).not.toContain("SECRETTOKEN");
    if (result.ok) {
      expect(result.invite.delivery).toBe("email");
      expect(result.invite.emailSentAt).toBe("2026-10-07T00:00:01.000Z");
    }
    expect(logCreated).toHaveBeenCalledTimes(1);
  });
});
