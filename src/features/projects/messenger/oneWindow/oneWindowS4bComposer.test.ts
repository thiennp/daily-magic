import { describe, expect, it, vi } from "vitest";

import {
  activeOneWindowMentionQuery,
  applyOneWindowMention,
  filterOneWindowMentionOptions,
  parseOneWindowMentions,
} from "@/features/projects/messenger/oneWindow/oneWindowMentions";
import { sendOneWindowComposerText } from "@/features/projects/messenger/oneWindow/useOneWindowComposerSend";

const A = [
  { membershipId: "b1", displayName: "Scout" },
  { membershipId: "b2", displayName: "Forge" },
  { membershipId: "b3", displayName: "Ink Well" },
];

describe("P1-S4b mentions", () => {
  it("finds @assistants by name, in order, unique, capped at 5", () => {
    expect(parseOneWindowMentions("@forge then @Scout, and @Forge again", A)).toEqual(["b2", "b1"]);
    expect(parseOneWindowMentions("ask @Ink Well please", A)).toEqual(["b3"]);
    expect(parseOneWindowMentions("mail me at x@Scout.com or @Scouting", A)).toEqual([]);
    const many = Array.from({ length: 7 }, (_, i) => ({ membershipId: `m${i}`, displayName: `A${i}` }));
    expect(parseOneWindowMentions(many.map((m) => `@${m.displayName}`).join(" "), many)).toHaveLength(5);
  });

  it("picker query, filtering and inserting the picked name", () => {
    expect(activeOneWindowMentionQuery("hi @sc", 6)).toBe("sc");
    expect(activeOneWindowMentionQuery("hi @", 4)).toBe("");
    expect(activeOneWindowMentionQuery("hi there", 8)).toBeNull();
    expect(filterOneWindowMentionOptions(A, "f").map((a) => a.displayName)).toEqual(["Forge"]);
    expect(applyOneWindowMention("hi @sc tail", 6, "Scout")).toEqual({ text: "hi @Scout  tail", caret: 10 });
  });
});

describe("P1-S4b send rules (existing send paths)", () => {
  const setup = (over: Partial<Parameters<typeof sendOneWindowComposerText>[0]> = {}) => {
    const onSendMessage = vi.fn(async () => true);
    const onSendTask = vi.fn(async () => true);
    const input = { assistants: A, mentionsEnabled: true, privateFeed: false, onSendMessage, onSendTask, ...over };
    return { input, onSendMessage, onSendTask };
  };

  it("each @ assigns one task with the full text", async () => {
    const { input, onSendMessage, onSendTask } = setup();
    await expect(sendOneWindowComposerText(input, " @Scout and @Forge check VAT ")).resolves.toBe(true);
    expect(onSendTask.mock.calls).toEqual([
      [{ assigneeMembershipId: "b1", summary: "@Scout and @Forge check VAT" }],
      [{ assigneeMembershipId: "b2", summary: "@Scout and @Forge check VAT" }],
    ]);
    expect(onSendMessage).not.toHaveBeenCalled();
  });

  it("a failed task keeps the draft and stops", async () => {
    const { input, onSendTask } = setup();
    onSendTask.mockResolvedValueOnce(false);
    await expect(sendOneWindowComposerText(input, "@Scout @Forge go")).resolves.toBe(false);
    expect(onSendTask).toHaveBeenCalledTimes(1);
  });

  it("no @: whole feed goes through routing; private feed asks for a reply", async () => {
    const pick = setup({ routing: { hideAllRoutingUi: false, beginSendWithoutMention: () => "pick" } });
    await expect(sendOneWindowComposerText(pick.input, "hello")).resolves.toBe(false);
    expect(pick.onSendMessage).not.toHaveBeenCalled();
    const whole = setup({ routing: { hideAllRoutingUi: false, beginSendWithoutMention: () => "send" } });
    await sendOneWindowComposerText(whole.input, "hello");
    expect(whole.onSendMessage).toHaveBeenCalledWith("hello", false);
    const priv = setup({ privateFeed: true, routing: { hideAllRoutingUi: false, beginSendWithoutMention: () => "pick" } });
    await sendOneWindowComposerText(priv.input, "hello");
    expect(priv.onSendMessage).toHaveBeenCalledWith("hello", true);
  });

  it("SINGLE: @ is plain text, never a task", async () => {
    const { input, onSendMessage, onSendTask } = setup({ mentionsEnabled: false });
    await sendOneWindowComposerText(input, "@Scout hi");
    expect(onSendTask).not.toHaveBeenCalled();
    expect(onSendMessage).toHaveBeenCalledWith("@Scout hi", false);
  });
});
