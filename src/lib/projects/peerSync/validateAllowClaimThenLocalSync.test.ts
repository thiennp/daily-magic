import { beforeEach, describe, expect, it, vi } from "vitest";

import { mintProjectAllowClaim } from "@/lib/projects/acl/mintProjectAllowClaim";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import { validateAllowClaimThenLocalSync } from "@/lib/projects/peerSync/validateAllowClaimThenLocalSync";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(async () => ({
    id: "proj-1",
    ownerUserId: "owner-1",
    deviceId: null,
    name: "Demo",
    folderPath: "/tmp",
    repoUrls: [],
    defaultBranch: null,
    lastUsedAt: null,
    createdAt: "2026-10-01T00:00:00.000Z",
    updatedAt: "2026-10-01T00:00:00.000Z",
  })),
}));

describe("validateAllowClaimThenLocalSync", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
    process.env.AUTH_SECRET = "test-secret-for-allow-claim";
  });

  it("returns local folder guidance after valid owner claim", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("CREATE TABLE")) return [];
      if (q.includes("FROM project_folder_refs")) {
        return [
          {
            id: "ref-1",
            project_id: "proj-1",
            machine_or_device_ref: "mac-1",
            folder_path: "/Users/a/demo",
            created_at: "2026-10-01T00:00:00.000Z",
            updated_at: "2026-10-01T00:00:00.000Z",
          },
        ];
      }
      return [];
    });

    const minted = await mintProjectAllowClaim({
      projectId: "proj-1",
      actorUserId: "owner-1",
    });
    expect(minted.ok).toBe(true);
    if (!minted.ok) {
      return;
    }

    const plan = await validateAllowClaimThenLocalSync(minted.allowClaim);
    expect(plan.ok).toBe(true);
    if (plan.ok) {
      expect(plan.folderRefs[0]?.folderPath).toBe("/Users/a/demo");
      expect(plan.guidance.toLowerCase()).toContain("local");
      expect(plan.guidance.toLowerCase()).toContain(
        "do not post handoffs to awc",
      );
    }
  });
});
