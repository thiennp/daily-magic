import { describe, expect, it } from "vitest";

import { PROJECT_BRIEFING_HOW_TO_DISPATCH } from "@/lib/projects/acl/projectBriefingHowToDispatch.constant";

describe("PROJECT_BRIEFING_HOW_TO_DISPATCH", () => {
  it("states the thin project inbox caps", () => {
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toContain("summary ≤ 200 chars");
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toContain("refs ≤ 768 bytes");
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toContain("media_not_allowed");
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toContain("localPath / P2P refs");
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toContain("delete-on-ack");
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toContain(
      "unacked messages expire after 3 days",
    );
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toContain(
      "Rate limits: 300/hour (rolling) + max 300 unread (ack/clear frees slots)",
    );
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toContain(
      'toProjectDisplayName: "Owner"',
    );
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toContain("peer.joined");
  });
});
