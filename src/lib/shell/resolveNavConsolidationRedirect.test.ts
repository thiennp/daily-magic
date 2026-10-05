import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock(
  "@/lib/projects/acl/humanInvites/authorizeProjectPageActor",
  () => ({
    authorizeProjectPageActor: vi.fn(),
  }),
);

import { authorizeProjectPageActor } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";
import { resolveNavConsolidationRedirectPath } from "@/lib/shell/resolveNavConsolidationRedirect";

describe("resolveNavConsolidationRedirectPath", () => {
  beforeEach(() => {
    vi.mocked(authorizeProjectPageActor).mockReset();
  });

  it("falls back to intent list when no project or actor", async () => {
    await expect(
      resolveNavConsolidationRedirectPath({
        intent: "bots",
        searchParams: {},
        actorUserId: "u1",
      }),
    ).resolves.toBe("/projects?intent=bots");

    await expect(
      resolveNavConsolidationRedirectPath({
        intent: "bots",
        searchParams: { project: "p1" },
        actorUserId: null,
      }),
    ).resolves.toBe("/projects?intent=bots");
  });

  it("deep-links openable project", async () => {
    vi.mocked(authorizeProjectPageActor).mockResolvedValue({
      ok: true,
      project: { id: "p1" } as never,
      role: "owner",
      membership: null,
    });

    await expect(
      resolveNavConsolidationRedirectPath({
        intent: "new-task",
        searchParams: { project: "p1", ref: "mail" },
        actorUserId: "u1",
      }),
    ).resolves.toBe("/projects/p1#activity?mode=task");
  });

  it("falls back when project is not openable", async () => {
    vi.mocked(authorizeProjectPageActor).mockResolvedValue({
      ok: false,
      reason: "forbidden",
    });

    await expect(
      resolveNavConsolidationRedirectPath({
        intent: "library",
        searchParams: { project: "nope" },
        actorUserId: "u1",
      }),
    ).resolves.toBe("/projects?intent=library");
  });
});
