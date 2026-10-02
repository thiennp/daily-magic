import { describe, expect, it, vi } from "vitest";

import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

describe("writeProjectAccessAudit no-op", () => {
  it("does not INSERT into project_access_audit", async () => {
    await writeProjectAccessAudit({
      projectId: "proj-1",
      actorUserId: "bot-1",
      action: "leave",
      targetUserId: "bot-1",
      detail: { membershipId: "mem-1" },
    });
    expect(sqlMock).not.toHaveBeenCalled();
  });
});
