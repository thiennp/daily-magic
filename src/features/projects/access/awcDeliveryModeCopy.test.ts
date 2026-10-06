import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AwcProjectAccessMemberDeliveryModeControl from "@/features/projects/access/AwcProjectAccessMemberDeliveryModeControl";
import AwcProjectAccessMemberWakeLinkPill from "@/features/projects/access/AwcProjectAccessMemberWakeLinkPill";
import { AWC_DELIVERY_MODE_COPY } from "@/features/projects/access/awcDeliveryModeCopy.constant";
import {
  listMembersAwaitingWakeLink,
  resolveMemberDeliveryModeDisplay,
  resolveMemberWakeLinkState,
} from "@/features/projects/access/utils/resolveMemberWakeLinkState";

const radio = (html: string, value: string): string =>
  html.match(new RegExp(`<input[^>]*value="${value}"[^>]*>`))?.[0] ?? "";

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

  it("pills: Checks on demand / Wakes up on its own / Waiting for wake link", () => {
    const pill = (state: "on_demand" | "wakes" | "awaiting") =>
      renderToStaticMarkup(
        createElement(AwcProjectAccessMemberWakeLinkPill, { state }),
      );
    expect(pill("on_demand")).toContain(">Checks on demand<");
    expect(pill("wakes")).toContain(">Wakes up on its own<");
    expect(pill("wakes")).not.toContain("Wake link set");
    expect(pill("awaiting")).toContain(">Waiting for wake link<");
  });

  it("no-link control never pre-selects wake; Add wake link sits under the help line", () => {
    const html = renderToStaticMarkup(
      createElement(AwcProjectAccessMemberDeliveryModeControl, {
        projectId: "p1",
        membershipId: "m1",
        memberName: "Coder",
        deliveryMode: "poll",
        wakeLinkSet: false,
      }),
    );
    expect(radio(html, "webhook")).not.toContain("checked");
    expect(radio(html, "webhook")).toContain("disabled");
    expect(radio(html, "poll")).toContain("checked");
    const help = html.indexOf("Needs a wake link. Add one to switch.");
    const add = html.indexOf(">Add wake link<");
    const pollLabel = html.indexOf("Checks on demand");
    expect(help).toBeGreaterThan(pollLabel);
    expect(add).toBeGreaterThan(help);
  });

  it("linked webhook control checks Wakes up on its own", () => {
    const html = renderToStaticMarkup(
      createElement(AwcProjectAccessMemberDeliveryModeControl, {
        projectId: "p1",
        membershipId: "m1",
        memberName: "Coder",
        deliveryMode: "webhook",
        wakeLinkSet: true,
      }),
    );
    expect(radio(html, "webhook")).toContain("checked");
    expect(radio(html, "poll")).not.toContain("checked");
    expect(html).not.toContain(">Add wake link<");
  });
});
