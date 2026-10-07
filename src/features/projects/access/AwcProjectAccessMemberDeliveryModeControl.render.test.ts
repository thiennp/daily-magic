import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AwcProjectAccessMemberDeliveryModeControl from "@/features/projects/access/AwcProjectAccessMemberDeliveryModeControl";
import AwcProjectAccessMemberWakeLinkPill from "@/features/projects/access/AwcProjectAccessMemberWakeLinkPill";

const radio = (html: string, value: string): string =>
  html.match(new RegExp(`<input[^>]*value="${value}"[^>]*>`))?.[0] ?? "";

describe("delivery_mode control + pill render", () => {
  it("pills: Checks in only when asked / Wakes up on its own / Waiting for wake link", () => {
    const pill = (state: "on_demand" | "wakes" | "awaiting") =>
      renderToStaticMarkup(
        createElement(AwcProjectAccessMemberWakeLinkPill, { state }),
      );
    expect(pill("on_demand")).toContain(">Checks in only when asked<");
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
    const pollLabel = html.indexOf("Checks in only when asked");
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
