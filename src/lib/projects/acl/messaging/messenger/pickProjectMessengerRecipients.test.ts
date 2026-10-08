import { describe, expect, it } from "vitest";

import { pickProjectMessengerRecipients } from "@/lib/projects/acl/messaging/messenger/pickProjectMessengerRecipients";
import { PROJECT_MESSENGER_WHOLE_THREAD_KEY } from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";
import type { ProjectMessengerBotSeat } from "@/lib/projects/acl/messaging/messenger/loadProjectMessengerBots";

describe("pickProjectMessengerRecipients", () => {
  it("returns exactly one bot for whole thread if there is exactly one bot", () => {
    const bots: readonly ProjectMessengerBotSeat[] = [
      {
        membershipId: "bot1",
        userId: "u1",
        displayName: "Bot 1",
        deliveryMode: "poll",
      },
    ];
    const res = pickProjectMessengerRecipients({
      threadKey: PROJECT_MESSENGER_WHOLE_THREAD_KEY,
      bots,
    });
    expect(res).toEqual({ ok: true, whole: true, recipients: bots });
  });

  it("returns no_bots for whole thread if there are no bots", () => {
    const res = pickProjectMessengerRecipients({
      threadKey: PROJECT_MESSENGER_WHOLE_THREAD_KEY,
      bots: [],
    });
    expect(res).toEqual({ ok: false, code: "no_bots" });
  });

  it("rejects whole thread if there are multiple bots", () => {
    const bots: readonly ProjectMessengerBotSeat[] = [
      {
        membershipId: "bot1",
        userId: "u1",
        displayName: "Bot 1",
        deliveryMode: "poll",
      },
      {
        membershipId: "bot2",
        userId: "u2",
        displayName: "Bot 2",
        deliveryMode: "poll",
      },
    ];
    const res = pickProjectMessengerRecipients({
      threadKey: PROJECT_MESSENGER_WHOLE_THREAD_KEY,
      bots,
    });
    expect(res).toEqual({ ok: false, code: "single_recipient_required" });
  });

  it("returns the specific bot if thread key is a membership id", () => {
    const bots: readonly ProjectMessengerBotSeat[] = [
      {
        membershipId: "bot1",
        userId: "u1",
        displayName: "Bot 1",
        deliveryMode: "poll",
      },
      {
        membershipId: "bot2",
        userId: "u2",
        displayName: "Bot 2",
        deliveryMode: "poll",
      },
    ];
    const res = pickProjectMessengerRecipients({
      threadKey: "bot2",
      bots,
    });
    expect(res).toEqual({
      ok: true,
      whole: false,
      recipients: [
        {
          membershipId: "bot2",
          userId: "u2",
          displayName: "Bot 2",
          deliveryMode: "poll",
        },
      ],
    });
  });

  it("returns thread_not_found if specific bot is not found", () => {
    const bots: readonly ProjectMessengerBotSeat[] = [
      {
        membershipId: "bot1",
        userId: "u1",
        displayName: "Bot 1",
        deliveryMode: "poll",
      },
    ];
    const res = pickProjectMessengerRecipients({
      threadKey: "bot2",
      bots,
    });
    expect(res).toEqual({ ok: false, code: "thread_not_found" });
  });
});
