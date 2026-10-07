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

describe("sendHumanProjectEmailInvite guards (DF-025)", () => {
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

  it("non-owner is forbidden and nothing is inserted or sent", async () => {
    authorize.mockResolvedValue({ allow: false, reason: "forbidden" });
    expect(await call()).toEqual({ ok: false, code: "forbidden" });
    expect(sqlMock).not.toHaveBeenCalled();
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("rejects invalid email", async () => {
    expect(await call({ email: "not-an-email" })).toEqual({
      ok: false,
      code: "invalid_email",
    });
    expect(await call({ email: "a@b.com, c@d.com" })).toEqual({
      ok: false,
      code: "invalid_email",
    });
  });

  it("reports email_not_configured before inserting", async () => {
    configured.mockReturnValue(false);
    expect(await call()).toEqual({ ok: false, code: "email_not_configured" });
    expect(sqlMock).not.toHaveBeenCalled();
  });

  it("refuses the owner's own email", async () => {
    expect(await call({ email: "OWNER@example.org" })).toEqual({
      ok: false,
      code: "cannot_invite_self",
    });
  });

  it("rate-limits per project", async () => {
    helpers.countRecentHumanEmailInvites.mockResolvedValue(20);
    expect(await call()).toEqual({ ok: false, code: "rate_limited" });
    expect(sqlMock).not.toHaveBeenCalled();
  });

  it("owner can explicitly opt out of approval", async () => {
    await call({ requiresApproval: false });
    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({ requiresApproval: false }),
    );
  });
});
