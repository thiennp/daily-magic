import { describe, expect, it } from "vitest";

import { mapAccessPendingToOneWindowCard } from "@/features/projects/messenger/oneWindow/mapAccessPendingToOneWindowCard";
import { ONE_WINDOW_FEED_COPY } from "@/features/projects/messenger/oneWindow/oneWindowFeedCopy.constant";
import { readFileSync } from "node:fs";
import path from "node:path";

describe("OW-H3 in-feed approvals", () => {
  it("maps live Access pending to Approve/Deny card model", () => {
    const model = mapAccessPendingToOneWindowCard({
      id: "req-1",
      requesterUserId: "u1",
      reason: "Join as a member",
      createdAt: "2026-10-07T12:00:00.000Z",
      requesterLabel: "Scout",
      expiresAt: "2026-10-14T12:00:00.000Z",
      approvalCard: null,
    });
    expect(model.kind).toBe("join");
    expect(model.status).toBe("waiting");
    expect(model.id).toBe("req-1");
    expect(model.title).toContain("Scout");
    expect(model.action).toContain("Join");
  });

  it("card chrome uses Approve / Deny; no second store", () => {
    expect(ONE_WINDOW_FEED_COPY.approve).toBe("Approve");
    expect(ONE_WINDOW_FEED_COPY.deny).toBe("Deny");
    const src = readFileSync(
      path.join(
        process.cwd(),
        "src/features/projects/messenger/oneWindow/AwcOneWindowInFeedApprovals.tsx",
      ),
      "utf8",
    );
    expect(src).toContain("fetchProjectAccess");
    expect(src).toContain("postProjectAccessAction");
    expect(src).toContain("/access/requests/");
    expect(src.toLowerCase()).not.toContain("createapprovalstore");
  });
});
