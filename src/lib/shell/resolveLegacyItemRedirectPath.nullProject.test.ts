import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/projects/acl/humanInvites/authorizeProjectPageActor", () => ({
  authorizeProjectPageActor: vi.fn(),
}));

import { authorizeProjectPageActor } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";
import { resolveLegacyItemRedirectPath } from "@/lib/shell/resolveLegacyItemRedirectPath";

const base = { searchParams: {}, actorUserId: "u1" } as const;

describe("resolveLegacyItemRedirectPath with a NULL project_id (069 nullable)", () => {
  beforeEach(() => {
    vi.mocked(authorizeProjectPageActor).mockReset();
  });

  it("sends a library item with no project to the notice, never /projects/null", async () => {
    await expect(
      resolveLegacyItemRedirectPath({
        ...base,
        intent: "library",
        legacyPath: "/library/cap-1",
        itemId: "cap-1",
        lookupProjectId: async () => null,
      }),
    ).resolves.toBe("/projects?intent=library");
    expect(authorizeProjectPageActor).not.toHaveBeenCalled();
  });

  it("sends a report with no project to the notice, never /projects/null", async () => {
    await expect(
      resolveLegacyItemRedirectPath({
        ...base,
        intent: "reports",
        legacyPath: "/reports/run-1",
        itemId: "run-1",
        lookupProjectId: async () => null,
      }),
    ).resolves.toBe("/projects?intent=reports");
    expect(authorizeProjectPageActor).not.toHaveBeenCalled();
  });

  it("treats an empty project_id the same as NULL", async () => {
    await expect(
      resolveLegacyItemRedirectPath({
        ...base,
        intent: "library",
        legacyPath: "/library/cap-1",
        itemId: "cap-1",
        lookupProjectId: async () => "",
      }),
    ).resolves.toBe("/projects?intent=library");
  });
});
