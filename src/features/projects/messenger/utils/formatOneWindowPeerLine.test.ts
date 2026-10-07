import { describe, expect, it } from "vitest";

import {
  formatOneWindowPeerLine,
  formatOneWindowPeerLineText,
  ONE_WINDOW_PEER_TEXT_MAX_CHARS,
} from "@/features/projects/messenger/utils/formatOneWindowPeerLine";
import {
  chat,
  peer,
} from "@/features/projects/messenger/utils/oneWindowPeerFeed.fixtures";

describe("formatOneWindowPeerLine (DF-023)", () => {
  it("renders a compact one-line row with the kind label", () => {
    const line = formatOneWindowPeerLine(peer("task.status"));
    expect(line).not.toBeNull();
    expect(formatOneWindowPeerLineText(line!)).toBe(
      "Kai → AW Lead · Status update · handoff: DF-023",
    );
    expect(line?.stateOnly).toBe(false);
  });

  it("uses chip copy for state kinds and keeps state-only rows", () => {
    expect(formatOneWindowPeerLine(peer("task.received"))).toMatchObject({
      label: "Got it",
      stateOnly: true,
    });
    expect(formatOneWindowPeerLine(peer("task.processing"))?.label).toBe(
      "Working on it",
    );
    expect(formatOneWindowPeerLine(peer("task.done"))?.label).toBe("Done");
    expect(formatOneWindowPeerLine(peer("task.blocked"))?.label).toBe(
      "Blocked",
    );
  });

  it("falls back to @team for team-label sends and clips long text", () => {
    const line = formatOneWindowPeerLine({
      ...peer("task.status", "x".repeat(300)),
      peer: { toMembershipId: null, toDisplayName: null, toTeamLabel: "bots" },
    });
    expect(line?.to).toBe("@bots");
    expect(line?.text.length).toBe(ONE_WINDOW_PEER_TEXT_MAX_CHARS);
  });

  it("returns null for ordinary chat entries", () => {
    expect(formatOneWindowPeerLine(chat())).toBeNull();
  });
});
