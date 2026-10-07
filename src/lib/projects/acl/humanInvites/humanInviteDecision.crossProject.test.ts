import { beforeEach, describe, expect, it, vi } from "vitest";

const authorize = vi.hoisted(() => vi.fn());
const sqlMock = vi.hoisted(() => vi.fn());
const logApproved = vi.hoisted(() => vi.fn());
const logDenied = vi.hoisted(() => vi.fn());

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
vi.mock("@/lib/projects/acl/humanInvites/logHumanInviteDecision", () => ({
  logHumanInviteRequestApproved: logApproved,
  logHumanInviteRequestDenied: logDenied,
}));

import { approveHumanInviteRequest } from "@/lib/projects/acl/humanInvites/approveHumanInviteRequest";
import { denyHumanInviteRequest } from "@/lib/projects/acl/humanInvites/denyHumanInviteRequest";
import { humanInviteEmailErrorJson } from "@/lib/projects/acl/humanInvites/humanInviteEmailErrorJson";

/** Owner of proj-mine passes an invite id that belongs to another project. */
const input = {
  projectId: "proj-mine",
  inviteId: "inv-of-other-project",
  ownerUserId: "owner-1",
};

const expectEveryStatementScopedToProject = () => {
  expect(sqlMock).toHaveBeenCalledTimes(2);
  for (const [strings, ...values] of sqlMock.mock.calls) {
    expect((strings as readonly string[]).join("?")).toContain("project_id =");
    expect(values).toContain("proj-mine");
    expect(values).toContain("inv-of-other-project");
  }
};

describe("DF-025 Approve/Deny: cross-project invite id → 404", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    authorize.mockResolvedValue({ allow: true });
    sqlMock.mockResolvedValue([]);
  });

  it("approve: decision + miss lookup are both project-scoped → not_found", async () => {
    expect(await approveHumanInviteRequest(input)).toEqual({
      ok: false,
      code: "not_found",
    });
    expectEveryStatementScopedToProject();
    expect(logApproved).not.toHaveBeenCalled();
  });

  it("deny: decision + miss lookup are both project-scoped → not_found", async () => {
    expect(await denyHumanInviteRequest(input)).toEqual({
      ok: false,
      code: "not_found",
    });
    expectEveryStatementScopedToProject();
    expect(logDenied).not.toHaveBeenCalled();
  });

  it("not_found maps to HTTP 404", () => {
    expect(humanInviteEmailErrorJson("not_found").status).toBe(404);
  });
});
