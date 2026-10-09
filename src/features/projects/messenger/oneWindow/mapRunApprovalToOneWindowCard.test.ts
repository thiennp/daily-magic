import { describe, expect, it } from "vitest";

import { mapRunApprovalToOneWindowCard } from "@/features/projects/messenger/oneWindow/mapRunApprovalToOneWindowCard";

const NOW = Date.parse("2026-10-09T12:00:00Z");
const approval = {
  runId: "run-1",
  requesterLabel: "Magi",
  prompt: "Fix the build\nand run the tests",
  tool: "codex",
  computerName: "Grey - Check",
  projectFolder: "/Users/me/baby-care",
  approvalExpiresAt: "2026-10-09T12:20:00Z",
};

describe("mapRunApprovalToOneWindowCard", () => {
  it("builds a waiting run card with folder, computer and minutes left", () => {
    expect(mapRunApprovalToOneWindowCard(approval, NOW)).toMatchObject({
      id: "run-1",
      kind: "run",
      status: "waiting",
      title: "Magi wants codex to run a task",
      action: "Fix the build",
      folder: "/Users/me/baby-care",
      computerLabel: "Grey - Check",
      expiresLabel: "Expires in 20 min",
    });
  });

  it("marks an expired approval as timed out without a countdown", () => {
    const card = mapRunApprovalToOneWindowCard(
      { ...approval, approvalExpiresAt: "2026-10-09T11:50:00Z" },
      NOW,
    );
    expect(card.status).toBe("timedout");
    expect(card.expiresLabel).toBeUndefined();
  });

  it("keeps waiting when there is no expiry and names an unnamed requester", () => {
    const card = mapRunApprovalToOneWindowCard(
      { ...approval, requesterLabel: null, approvalExpiresAt: null },
      NOW,
    );
    expect(card.status).toBe("waiting");
    expect(card.whoName).toBe("An assistant");
  });
});
