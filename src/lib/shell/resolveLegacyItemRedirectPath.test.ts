import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/projects/acl/humanInvites/authorizeProjectPageActor", () => ({
  authorizeProjectPageActor: vi.fn(),
}));

import { authorizeProjectPageActor } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";
import { resolveLegacyItemRedirectPath } from "@/lib/shell/resolveLegacyItemRedirectPath";

const allow = () =>
  vi.mocked(authorizeProjectPageActor).mockResolvedValue({
    ok: true,
    project: { id: "p1" } as never,
    role: "owner",
    membership: null,
  });

const base = {
  legacyPath: "/library/cap-1",
  itemId: "cap-1",
  searchParams: {},
  actorUserId: "u1",
} as const;

describe("resolveLegacyItemRedirectPath", () => {
  beforeEach(() => {
    vi.mocked(authorizeProjectPageActor).mockReset();
  });

  it("sends a library item to its own project tab", async () => {
    allow();
    await expect(
      resolveLegacyItemRedirectPath({
        ...base,
        intent: "library",
        lookupProjectId: async () => "p1",
      }),
    ).resolves.toBe("/projects/p1#library?item=cap-1");
  });

  it("sends a report to its own project tab", async () => {
    allow();
    await expect(
      resolveLegacyItemRedirectPath({
        ...base,
        intent: "reports",
        legacyPath: "/reports/run-1",
        itemId: "run-1",
        lookupProjectId: async () => "p1",
      }),
    ).resolves.toBe("/projects/p1#reports?report=run-1");
  });

  it("prefers the item's project over ?project=", async () => {
    allow();
    await resolveLegacyItemRedirectPath({
      ...base,
      intent: "library",
      searchParams: { project: "other" },
      lookupProjectId: async () => "p1",
    });
    expect(authorizeProjectPageActor).toHaveBeenCalledWith({
      projectId: "p1",
      actorUserId: "u1",
    });
  });

  it("falls back to the notice when missing, forbidden, or the lookup throws", async () => {
    await expect(
      resolveLegacyItemRedirectPath({
        ...base,
        intent: "library",
        lookupProjectId: async () => null,
      }),
    ).resolves.toBe("/projects?intent=library");

    vi.mocked(authorizeProjectPageActor).mockResolvedValue({
      ok: false,
      reason: "forbidden",
    });
    await expect(
      resolveLegacyItemRedirectPath({
        ...base,
        intent: "reports",
        lookupProjectId: async () => "p1",
      }),
    ).resolves.toBe("/projects?intent=reports");

    await expect(
      resolveLegacyItemRedirectPath({
        ...base,
        intent: "library",
        lookupProjectId: async () => {
          throw new Error("db down");
        },
      }),
    ).resolves.toBe("/projects?intent=library");
  });

  it("sends signed-out visitors to login and back to the same link", async () => {
    await expect(
      resolveLegacyItemRedirectPath({
        ...base,
        intent: "library",
        actorUserId: null,
        searchParams: { tab: "x" },
        lookupProjectId: async () => "p1",
      }),
    ).resolves.toBe(
      `/login?callbackUrl=${encodeURIComponent("/library/cap-1?tab=x")}`,
    );
    expect(authorizeProjectPageActor).not.toHaveBeenCalled();
  });
});
