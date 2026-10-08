import { describe, expect, it, vi } from "vitest";

import { sendOneWindowComposerText } from "@/features/projects/messenger/oneWindow/useOneWindowComposerSend";

const A = [
  { membershipId: "b1", displayName: "Scout" },
  { membershipId: "b2", displayName: "Forge" },
  { membershipId: "b3", displayName: "Ink Well" },
];

describe("P1-S4b send rules (existing send paths)", () => {
  const setup = (
    over: Partial<Parameters<typeof sendOneWindowComposerText>[0]> = {},
  ) => {
    const onSendMessage = vi.fn(async () => true);
    const onSendTask = vi.fn(async () => true);
    const input = {
      assistants: A,
      mentionsEnabled: true,
      privateFeed: false,
      onSendMessage,
      onSendTask,
      ...over,
    };
    return { input, onSendMessage, onSendTask };
  };

  it("a single @ assigns one task with the full text", async () => {
    const { input, onSendMessage, onSendTask } = setup();
    await expect(
      sendOneWindowComposerText(input, " @Scout check VAT "),
    ).resolves.toBe(true);
    expect(onSendTask.mock.calls).toEqual([
      [{ assigneeMembershipId: "b1", summary: "@Scout check VAT" }],
    ]);
    expect(onSendMessage).not.toHaveBeenCalled();
  });

  it("multiple @ blocks the send", async () => {
    const { input, onSendTask } = setup();
    await expect(
      sendOneWindowComposerText(input, "@Scout @Forge go"),
    ).resolves.toBe(false);
    expect(onSendTask).not.toHaveBeenCalled();
  });

  it("a failed task keeps the draft and stops", async () => {
    const { input, onSendTask } = setup();
    onSendTask.mockResolvedValueOnce(false);
    await expect(sendOneWindowComposerText(input, "@Scout go")).resolves.toBe(
      false,
    );
    expect(onSendTask).toHaveBeenCalledTimes(1);
  });

  it("no @: whole feed goes through routing; private feed asks for a reply", async () => {
    const pick = setup({
      routing: {
        hideAllRoutingUi: false,
        beginSendWithoutMention: () => "pick",
      },
    });
    await expect(sendOneWindowComposerText(pick.input, "hello")).resolves.toBe(
      false,
    );
    expect(pick.onSendMessage).not.toHaveBeenCalled();
    const whole = setup({
      routing: {
        hideAllRoutingUi: false,
        beginSendWithoutMention: () => "send",
      },
    });
    await sendOneWindowComposerText(whole.input, "hello");
    expect(whole.onSendMessage).toHaveBeenCalledWith("hello", false);
    const priv = setup({
      privateFeed: true,
      routing: {
        hideAllRoutingUi: false,
        beginSendWithoutMention: () => "pick",
      },
    });
    await sendOneWindowComposerText(priv.input, "hello");
    expect(priv.onSendMessage).toHaveBeenCalledWith("hello", true);
  });

  it("SINGLE: @ is plain text, never a task", async () => {
    const { input, onSendMessage, onSendTask } = setup({
      mentionsEnabled: false,
    });
    await sendOneWindowComposerText(input, "@Scout hi");
    expect(onSendTask).not.toHaveBeenCalled();
    expect(onSendMessage).toHaveBeenCalledWith("@Scout hi", false);
  });
});
