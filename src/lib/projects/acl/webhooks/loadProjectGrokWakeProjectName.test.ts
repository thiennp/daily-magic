import { afterEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));

import { loadProjectGrokWakeProjectName } from "@/lib/projects/acl/webhooks/loadProjectGrokWakeProjectName";

describe("loadProjectGrokWakeProjectName", () => {
  afterEach(() => {
    sqlMock.mockReset();
  });

  it("returns trimmed name for this projectId only", async () => {
    sqlMock.mockResolvedValue([{ name: "  AgentWitch  " }]);
    await expect(loadProjectGrokWakeProjectName("proj-1")).resolves.toBe(
      "AgentWitch",
    );
    const q = String(sqlMock.mock.calls[0]?.[0] ?? "");
    expect(q).toContain("FROM user_projects");
    expect(q).toContain("WHERE id =");
  });

  it("fails open to null on empty or error", async () => {
    sqlMock.mockResolvedValue([{ name: "   " }]);
    await expect(loadProjectGrokWakeProjectName("proj-1")).resolves.toBeNull();
    sqlMock.mockRejectedValue(new Error("db down"));
    await expect(loadProjectGrokWakeProjectName("proj-1")).resolves.toBeNull();
  });
});
