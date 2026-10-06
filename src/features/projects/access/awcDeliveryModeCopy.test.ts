import { describe, expect, it } from "vitest";

import { AWC_DELIVERY_MODE_COPY } from "@/features/projects/access/awcDeliveryModeCopy.constant";
import {
  listMembersAwaitingWakeLink,
  resolveMemberDeliveryModeDisplay,
  resolveMemberWakeLinkState,
} from "@/features/projects/access/utils/resolveMemberWakeLinkState";

describe("delivery_mode owner copy + row state", () => {
  it("locks Product EN strings", () => {
    expect(AWC_DELIVERY_MODE_COPY).toMatchObject({
      label: "How it gets messages",
      optionWebhook: "Wakes up on its own",
      optionPoll: "Checks on demand",
      webhookNeedsLink: "Needs a wake link. Add one to switch.",
      addWakeLink: "Add wake link",
      toastPoll:
        "{name} now checks on demand. It reads messages when its person asks.",
      toastWebhook: "{name} now wakes up on its own.",
      toastSavedAutoFlip:
        "Wake link saved. {name} now wakes up on its own when the project needs it.",
      error: "Couldn't switch how {name} gets messages. Try again.",
      invalidMode: "Choose how {name} gets messages.",
    });
  });

  it("badge matrix: mode first, then link", () => {
    const bot = { id: "m1", isAgent: true };
    const state = (wakeLinkSet: boolean, deliveryMode?: "webhook" | "poll") =>
      resolveMemberWakeLinkState({ ...bot, wakeLinkSet, deliveryMode });
    expect(state(false, "poll")).toBe("on_demand");
    expect(state(true, "poll")).toBe("on_demand");
    expect(state(true, "webhook")).toBe("wakes");
    expect(state(false, "webhook")).toBe("awaiting");
    expect(state(false)).toBe("awaiting");
    // A wake-link save this session flips to webhook server-side.
    expect(
      resolveMemberWakeLinkState(
        { ...bot, wakeLinkSet: false, deliveryMode: "poll" },
        new Set(["m1"]),
      ),
    ).toBe("wakes");
    expect(
      listMembersAwaitingWakeLink([
        { ...bot, wakeLinkSet: false, deliveryMode: "poll" as const },
        { ...bot, id: "m2", wakeLinkSet: false },
        { ...bot, id: "m3", wakeLinkSet: true, deliveryMode: "poll" as const },
      ]),
    ).toEqual([{ ...bot, id: "m2", wakeLinkSet: false }]);
  });

  it("display rule: webhook only with a link AND mode webhook", () => {
    const bot = { id: "m1", isAgent: true };
    const show = (wakeLinkSet: boolean, deliveryMode?: "webhook" | "poll") =>
      resolveMemberDeliveryModeDisplay({ ...bot, wakeLinkSet, deliveryMode });
    expect(show(true, "webhook")).toBe("webhook");
    expect(show(false, "webhook")).toBe("poll");
    expect(show(false)).toBe("poll");
    expect(show(true, "poll")).toBe("poll");
    expect(show(false, "poll")).toBe("poll");
    expect(
      resolveMemberDeliveryModeDisplay(
        { ...bot, wakeLinkSet: false, deliveryMode: "poll" },
        new Set(["m1"]),
      ),
    ).toBe("webhook");
  });
});
