import { describe, expect, it, vi } from "vitest";

import { isAgentRunStopAllowed } from "@/lib/dispatch/isAgentRunStopAllowed";

vi.mock("@/lib/db", () => ({ getSql: vi.fn(), asRowArray: vi.fn() }));

const run = {
  requesterUserId: "member-1",
  executorUserId: "device-owner",
  projectId: "proj-1",
};

describe("isAgentRunStopAllowed (S0-7)", () => {
  it("allows the device owner and the requester without a lookup", async () => {
    const lookup = vi.fn();
    expect(await isAgentRunStopAllowed(run, "device-owner", lookup)).toBe(true);
    expect(await isAgentRunStopAllowed(run, "member-1", lookup)).toBe(true);
    expect(lookup).not.toHaveBeenCalled();
  });

  it("allows the project owner", async () => {
    const lookup = vi.fn(async () => "project-owner");
    expect(await isAgentRunStopAllowed(run, "project-owner", lookup)).toBe(
      true,
    );
    expect(lookup).toHaveBeenCalledWith("proj-1");
  });

  it("refuses anyone else, and runs without a project", async () => {
    const lookup = vi.fn(async () => "project-owner");
    expect(
      await isAgentRunStopAllowed(run, "bot-claimed-by-owner", lookup),
    ).toBe(false);
    expect(
      await isAgentRunStopAllowed(
        { ...run, projectId: null },
        "project-owner",
        lookup,
      ),
    ).toBe(false);
  });

  it("fails closed when the owner lookup throws", async () => {
    const lookup = vi.fn(async () => {
      throw new Error("db down");
    });
    expect(await isAgentRunStopAllowed(run, "project-owner", lookup)).toBe(
      false,
    );
  });
});
