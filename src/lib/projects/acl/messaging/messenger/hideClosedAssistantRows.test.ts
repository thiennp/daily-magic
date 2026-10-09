import { beforeEach, describe, expect, it, vi } from "vitest";

const closedMock = vi.hoisted(() => vi.fn());
vi.mock("@/lib/projects/acl/messaging/messenger/loadClosedBotSeats", () => ({
  loadClosedBotSeats: closedMock,
}));

import { hideClosedAssistantRows } from "@/lib/projects/acl/messaging/messenger/hideClosedAssistantRows";

const row = (
  toMembershipId: string | null,
  senderMembershipId: string | null,
) => ({ toMembershipId, senderMembershipId }) as never;

describe("hideClosedAssistantRows", () => {
  beforeEach(() => {
    closedMock.mockResolvedValue(new Map([["closed-bot", "alice"]]));
  });

  it("drops rows to or from a closed assistant for everyone but its inviter", async () => {
    const rows = [
      row("closed-bot", null),
      row(null, "closed-bot"),
      row("open", null),
    ];
    const forMe = await hideClosedAssistantRows({
      projectId: "p",
      viewerUserId: "me",
      rows,
    });
    expect(forMe).toHaveLength(1);
    const forAlice = await hideClosedAssistantRows({
      projectId: "p",
      viewerUserId: "alice",
      rows,
    });
    expect(forAlice).toHaveLength(3);
  });

  it("changes nothing without a viewer", async () => {
    const rows = [row("closed-bot", null)];
    expect(
      await hideClosedAssistantRows({
        projectId: "p",
        viewerUserId: undefined,
        rows,
      }),
    ).toEqual(rows);
  });
});
