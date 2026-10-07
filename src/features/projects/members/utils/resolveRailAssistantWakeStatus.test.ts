import { describe, expect, it } from "vitest";

import { resolveRailAssistantWakeStatus as resolve } from "@/features/projects/members/utils/resolveRailAssistantWakeStatus";

const none: ReadonlySet<string> = new Set();
const ok = { failed: false, line: "No wakes yet", offerPaste: false };
const bad = { failed: true, line: "Last wake failed", offerPaste: true };
const linked = { id: "a", wakeLinkSet: true, deliveryMode: "webhook" };

describe("resolveRailAssistantWakeStatus (P1-S1b)", () => {
  it("never claims 'Wake link ✓' without a stored wake link", () => {
    expect(resolve({ member: { id: "a" }, savedIds: none, health: ok })).toBe("not_connected");
    expect(resolve({ member: { id: "a", wakeLinkSet: false }, savedIds: none, health: ok })).toBe(
      "not_connected",
    );
  });

  it("stored link: Checking… while loading, Wake link ✓ / Wake failed from health", () => {
    expect(resolve({ member: linked, savedIds: none, health: undefined })).toBe("checking");
    expect(resolve({ member: linked, savedIds: none, health: ok })).toBe("ready");
    expect(resolve({ member: linked, savedIds: none, health: bad })).toBe("cant_reach");
    expect(resolve({ member: linked, savedIds: none, health: null })).toBe("not_connected");
  });

  it("Checking… right after a save until the next load confirms it", () => {
    const saved = new Set(["a"]);
    const member = { id: "a", wakeLinkSet: false, deliveryMode: "poll" };
    expect(resolve({ member, savedIds: saved, health: undefined })).toBe("checking");
  });

  it("poll mode reads Checks in only when asked, even with a link", () => {
    const member = { id: "a", wakeLinkSet: true, deliveryMode: "poll" };
    expect(resolve({ member, savedIds: none, health: ok })).toBe("checks_on_demand");
  });
});
