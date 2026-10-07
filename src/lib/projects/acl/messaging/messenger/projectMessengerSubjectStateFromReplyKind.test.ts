import { describe, expect, it } from "vitest";

import { projectMessengerSubjectStateFromReplyKind as fromReply } from "@/lib/projects/acl/messaging/messenger/projectMessengerSubjectStateFromReplyKind";
import { readProjectMessengerProgress as progress } from "@/lib/projects/acl/messaging/messenger/readProjectMessengerProgress";

describe("projectMessengerSubjectStateFromReplyKind (S5 item 3)", () => {
  it.each([
    ["task.received", "queued", false],
    ["task.processing", "running", false],
    ["task.status", "running", false],
    ["task.done", "done", false],
    ["task.blocked", "blocked", true],
  ] as const)("%s → %s", (kind, status, needsYou) => {
    expect(fromReply(kind)).toEqual({
      source: "reply_kind",
      status,
      needsYou,
      awaitingApproval: false,
    });
  });

  it("task.status carries progress from its summary; others never do", () => {
    expect(fromReply("task.status", "3/5 files")).toMatchObject({
      status: "running",
      done: 3,
      of: 5,
    });
    expect(fromReply("task.status", "about 40% there")).toMatchObject({
      done: 40,
      of: 100,
    });
    expect(fromReply("task.processing", "3/5")).not.toHaveProperty("done");
    expect(fromReply("task.status", "still going")).not.toHaveProperty("of");
  });

  it("non-reply kinds have none", () => {
    expect(fromReply("chat.note")).toBeNull();
    expect(fromReply("task.assign")).toBeNull();
  });
});

describe("readProjectMessengerProgress", () => {
  it.each([
    ["status: 2 / 4 steps", { done: 2, of: 4 }],
    ["step 7 of 10", { done: 7, of: 10 }],
    ["100%", { done: 100, of: 100 }],
    ["0 %", { done: 0, of: 100 }],
  ])("%s → %j", (text, expected) => {
    expect(progress(text)).toEqual(expected);
  });

  it.each(["no numbers", "250%", "9/3", "1.5%", "3/0", ""])(
    "%s → null",
    (text) => {
      expect(progress(text)).toBeNull();
    },
  );
});
