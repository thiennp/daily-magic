import { describe, expect, it } from "vitest";

import { buildComputerLimitErrorMessage } from "@/lib/billing/buildComputerLimitErrorMessage";

const NOW = Date.parse("2026-10-08T12:00:00.000Z");
const online = (label: string) => ({
  label,
  lastSeenAt: new Date(NOW - 30_000).toISOString(),
});
const offline = (label: string) => ({
  label,
  lastSeenAt: new Date(NOW - 3 * 24 * 3_600_000).toISOString(),
});

describe("buildComputerLimitErrorMessage (f6e63bf4)", () => {
  it("E2E 6/8: 3 online + 2 offline agrees with the sidebar and names the offline ones", () => {
    const message = buildComputerLimitErrorMessage({
      maxComputers: 5,
      nowMs: NOW,
      computers: [
        online("Grey - Check"),
        online("Linux device"),
        online("Light - Check"),
        { label: "Your computer", lastSeenAt: null },
        offline("Grey - Study"),
      ],
    });
    expect(message).toContain("up to 5 computers, and 5 are linked");
    expect(message).toContain(
      "3 online, 2 offline: Your computer, Grey - Study",
    );
    expect(message).toContain("Offline computers still count.");
    expect(message).toContain("Your computers on Home");
    expect(message).not.toContain("Computers page");
    expect(message).not.toContain("you have 5 connected");
  });

  it("all online: no offline note", () => {
    const message = buildComputerLimitErrorMessage({
      maxComputers: 2,
      nowMs: NOW,
      computers: [online("A"), online("B")],
    });
    expect(message).toContain("2 are linked to your account (all online)");
    expect(message).not.toContain("Offline computers still count");
  });

  it("caps the named offline list", () => {
    const message = buildComputerLimitErrorMessage({
      maxComputers: 5,
      nowMs: NOW,
      computers: ["A", "B", "C", "D", "E"].map(offline),
    });
    expect(message).toContain("0 online, 5 offline: A, B, C and 2 more");
  });
});
