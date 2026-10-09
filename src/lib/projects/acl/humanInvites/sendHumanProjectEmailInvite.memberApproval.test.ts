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

vi.mock("@/lib/projects/acl/authorizeProjectInviter", () => ({
  authorizeProjectInviter: authorize,
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
  insertedLockFlag,
  primeSendInviteMocks,
} from "@/lib/projects/acl/humanInvites/sendHumanEmailInviteTestFixtures";

describe("sendHumanProjectEmailInvite as a member", () => {
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

  it("always needs the owner's approval, whatever the member asks for", async () => {
    authorize.mockResolvedValue({ allow: true, owner: false });
    await call({ requiresApproval: false });
    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({ requiresApproval: true }),
    );
  });
});
