import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/dispatch/agentRunQueries", () => ({
  getAgentRunById: vi.fn(),
}));

import { getAgentRunById } from "@/lib/dispatch/agentRunQueries";
import { lookupAgentRunProjectId } from "@/lib/dispatch/lookupAgentRunProjectId";

const runWith = (projectId: string | null) =>
  vi.mocked(getAgentRunById).mockResolvedValue({ projectId } as never);

describe("lookupAgentRunProjectId", () => {
  beforeEach(() => {
    vi.mocked(getAgentRunById).mockReset();
  });

  it("returns the report's project_id", async () => {
    runWith("p1");
    await expect(lookupAgentRunProjectId("run-1")).resolves.toBe("p1");
  });

  it("returns null for a NULL or empty project_id (069 leaves it nullable)", async () => {
    runWith(null);
    await expect(lookupAgentRunProjectId("run-1")).resolves.toBeNull();

    runWith("");
    await expect(lookupAgentRunProjectId("run-1")).resolves.toBeNull();
  });

  it("returns null for a missing run or a failed lookup", async () => {
    vi.mocked(getAgentRunById).mockResolvedValue(null);
    await expect(lookupAgentRunProjectId("run-1")).resolves.toBeNull();

    vi.mocked(getAgentRunById).mockRejectedValue(new Error("db down"));
    await expect(lookupAgentRunProjectId("run-1")).resolves.toBeNull();
  });
});
