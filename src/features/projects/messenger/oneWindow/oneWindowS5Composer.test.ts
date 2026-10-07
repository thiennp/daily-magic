import { describe, expect, it, vi } from "vitest";

import {
  type OneWindowSendMessage,
  oneWindowSendTargetKeys,
  oneWindowWholeFeedSwitchLabel,
  sendOneWindowMessageTo,
} from "@/features/projects/messenger/oneWindow/oneWindowSendTarget";
import { sendOneWindowComposerText } from "@/features/projects/messenger/oneWindow/useOneWindowComposerSend";
import type { MessengerKeptRecipient } from "@/features/projects/messenger/types/messengerChatStore.type";

const A = [
  { membershipId: "b1", displayName: "Scout" },
  { membershipId: "b2", displayName: "Forge" },
];
const names = new Map(A.map((a) => [a.membershipId, a.displayName]));
const scout: MessengerKeptRecipient = { kind: "assistants", membershipIds: ["b1"] };
const pair: MessengerKeptRecipient = { kind: "assistants", membershipIds: ["b1", "b2"] };
const everyone: MessengerKeptRecipient = { kind: "everyone" };

const setup = (kept: MessengerKeptRecipient | null, privateFeed = false) => {
  const onSendMessage = vi.fn<OneWindowSendMessage>(async () => true);
  const onSendTask = vi.fn(async () => true);
  const routing = { hideAllRoutingUi: false, beginSendWithoutMention: () => "send" as const, kept };
  const input = { assistants: A, mentionsEnabled: true, privateFeed, routing, onSendMessage, onSendTask };
  return { input, onSendMessage, onSendTask };
};

describe("P1-S5 KEPT(r) is the no-@ send target (COMPOSER-LOCK)", () => {
  it("kept assistant: a no-@ message goes to its own thread, not the whole feed", async () => {
    const { input, onSendMessage } = setup(scout);
    await expect(sendOneWindowComposerText(input, " ship it ")).resolves.toBe(true);
    expect(onSendMessage.mock.calls).toEqual([["ship it", false, "b1"]]);
  });

  it("kept many: one send per assistant, in order, no duplicates; a failure stops", async () => {
    const dup = setup({ kind: "assistants", membershipIds: ["b1", "b2", "b1"] });
    await sendOneWindowComposerText(dup.input, "hi");
    expect(dup.onSendMessage.mock.calls.map((call) => call[2])).toEqual(["b1", "b2"]);
    const failing = setup(pair);
    failing.onSendMessage.mockResolvedValueOnce(false);
    await expect(sendOneWindowComposerText(failing.input, "hi")).resolves.toBe(false);
    expect(failing.onSendMessage).toHaveBeenCalledTimes(1);
  });

  it("kept everyone → whole thread; @ still wins and leaves r alone; private feed unchanged", async () => {
    const all = setup(everyone);
    await sendOneWindowComposerText(all.input, "hi");
    expect(all.onSendMessage).toHaveBeenCalledWith("hi", false, "whole");
    const at = setup(scout);
    await sendOneWindowComposerText(at.input, "@Forge check");
    expect(at.onSendTask).toHaveBeenCalledWith({ assigneeMembershipId: "b2", summary: "@Forge check" });
    expect(at.onSendMessage).not.toHaveBeenCalled();
    const priv = setup(scout, true);
    await sendOneWindowComposerText(priv.input, "hi");
    expect(priv.onSendMessage).toHaveBeenCalledWith("hi", true);
  });

  it("picker confirm sends to the picked r (one-shot or kept)", async () => {
    const send = vi.fn<OneWindowSendMessage>(async () => true);
    await sendOneWindowMessageTo(send, "draft", { kind: "assistants", membershipIds: ["b2"] });
    await sendOneWindowMessageTo(send, "draft", everyone);
    expect(send.mock.calls).toEqual([["draft", false, "b2"], ["draft", false, "whole"]]);
    expect(oneWindowSendTargetKeys(null)).toEqual(["whole"]);
    expect(oneWindowSendTargetKeys({ kind: "assistants", membershipIds: [] })).toEqual(["whole"]);
  });

  it("guard: the whole-feed switch always names the target", () => {
    expect(oneWindowWholeFeedSwitchLabel(scout, names)).toBe("To Scout");
    expect(oneWindowWholeFeedSwitchLabel(pair, names)).toBe("To Scout and 1 more");
    expect(oneWindowWholeFeedSwitchLabel(everyone, names)).toBe("To everyone");
    expect(oneWindowWholeFeedSwitchLabel(null, names)).toBe("To everyone");
  });
});
