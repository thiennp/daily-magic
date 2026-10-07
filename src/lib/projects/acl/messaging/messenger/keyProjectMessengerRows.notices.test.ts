import { describe, expect, it } from "vitest";

import { keyProjectMessengerRows } from "@/lib/projects/acl/messaging/messenger/keyProjectMessengerRows";
import {
  MESSENGER_BOT_IDS,
  MESSENGER_PLANNER,
} from "@/lib/projects/acl/messaging/messenger/projectMessenger.fixtures";
import {
  NOTICE_ROWS,
  NOTICE_TASK_ID,
} from "@/lib/projects/acl/messaging/messenger/projectMessengerNotice.fixtures";

const key = (notices?: "owner" | "member") =>
  keyProjectMessengerRows({
    rows: NOTICE_ROWS,
    botIds: MESSENGER_BOT_IDS,
    ...(notices !== undefined ? { notices } : {}),
  });

describe("keyProjectMessengerRows notices (thread GET)", () => {
  it("without `notices` (thread list / snapshot) notices stay dropped", () => {
    expect(key().map((row) => row.row.messageId)).toEqual([NOTICE_TASK_ID]);
  });

  it("owner: silence notice goes to its message's thread, as a notice", () => {
    const silent = key("owner").find((row) => row.row.messageId === "n-silent");
    expect(silent).toMatchObject({
      threadKey: MESSENGER_PLANNER,
      inReplyTo: NOTICE_TASK_ID,
      notice: true,
      visible: true,
    });
    expect(silent?.text).toContain("No activity from Planner bot");
  });

  it("owner: owner-addressed server notice lands in Whole project", () => {
    const sticky = key("owner").find((row) => row.row.messageId === "n-sticky");
    expect(sticky).toMatchObject({ threadKey: "whole", notice: true });
  });

  it("lifecycle fan-out keeps only the owner's copy (no duplicates)", () => {
    for (const viewer of ["owner", "member"] as const) {
      const ids = key(viewer).map((row) => row.row.messageId);
      expect(ids).toContain("n-join-owner");
      expect(ids).not.toContain("n-join-bot");
    }
  });

  it("member: no silence or owner-only server notices", () => {
    const ids = key("member").map((row) => row.row.messageId);
    expect(ids).toEqual([NOTICE_TASK_ID, "n-join-owner"]);
  });
});
