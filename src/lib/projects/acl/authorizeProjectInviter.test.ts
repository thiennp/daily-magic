import { beforeEach, describe, expect, it, vi } from "vitest";

const authorizeOwner = vi.hoisted(() => vi.fn());
const getMembership = vi.hoisted(() => vi.fn());

vi.mock("@/lib/projects/acl/authorizeProjectOwner", () => ({
  authorizeProjectOwner: authorizeOwner,
}));
vi.mock("@/lib/projects/acl/getActiveProjectMembership", () => ({
  getActiveProjectMembership: getMembership,
}));

import { authorizeProjectInviter } from "@/lib/projects/acl/authorizeProjectInviter";

const ask = () =>
  authorizeProjectInviter({ projectId: "p1", actorUserId: "u1" });

describe("authorizeProjectInviter", () => {
  beforeEach(() => {
    authorizeOwner.mockReset();
    getMembership.mockReset();
    authorizeOwner.mockResolvedValue({ allow: false, reason: "forbidden" });
  });

  it("allows the owner without looking at memberships", async () => {
    authorizeOwner.mockResolvedValue({ allow: true });
    expect(await ask()).toEqual({ allow: true, owner: true });
    expect(getMembership).not.toHaveBeenCalled();
  });

  it("allows an active human member", async () => {
    getMembership.mockResolvedValue({ memberKind: "human", role: "member" });
    expect(await ask()).toEqual({ allow: true, owner: false });
  });

  it("refuses viewers, bots and non-members; keeps not_found", async () => {
    getMembership.mockResolvedValue({ memberKind: "human", role: "viewer" });
    expect(await ask()).toEqual({ allow: false, reason: "forbidden" });
    getMembership.mockResolvedValue({ memberKind: "bot", role: "member" });
    expect(await ask()).toEqual({ allow: false, reason: "forbidden" });
    getMembership.mockResolvedValue(null);
    expect(await ask()).toEqual({ allow: false, reason: "forbidden" });
    authorizeOwner.mockResolvedValue({ allow: false, reason: "not_found" });
    expect(await ask()).toEqual({ allow: false, reason: "not_found" });
  });
});
