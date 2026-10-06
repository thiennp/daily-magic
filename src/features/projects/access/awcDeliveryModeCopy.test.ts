import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AwcProjectAccessMemberWakeLinkPill from "@/features/projects/access/AwcProjectAccessMemberWakeLinkPill";
import { AWC_DELIVERY_MODE_COPY } from "@/features/projects/access/awcDeliveryModeCopy.constant";
import {
  listMembersAwaitingWakeLink,
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
      toastSavedAutoFlipSuffix: " It now wakes up on its own.",
    });
  });

  it("poll bot without a link is on_demand (not awaiting); a link wins", () => {
    const bot = { id: "m1", isAgent: true, wakeLinkSet: false };
    expect(resolveMemberWakeLinkState({ ...bot, deliveryMode: "poll" })).toBe(
      "on_demand",
    );
    expect(resolveMemberWakeLinkState(bot)).toBe("awaiting");
    expect(
      resolveMemberWakeLinkState({
        ...bot,
        wakeLinkSet: true,
        deliveryMode: "poll",
      }),
    ).toBe("set");
    expect(
      listMembersAwaitingWakeLink([
        { ...bot, deliveryMode: "poll" },
        { ...bot, id: "m2" },
      ]),
    ).toEqual([{ ...bot, id: "m2" }]);
  });

  it("pill reads Checks on demand", () => {
    const html = renderToStaticMarkup(
      createElement(AwcProjectAccessMemberWakeLinkPill, { state: "on_demand" }),
    );
    expect(html).toContain("Checks on demand");
  });
});
