import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import AwcProjectAccessMemberWakeLinkSlot from "@/features/projects/access/AwcProjectAccessMemberWakeLinkSlot";

const radio = (html: string, value: string): string =>
  html.match(new RegExp(`<input[^>]*value="${value}"[^>]*>`))?.[0] ?? "";

const render = (
  member: { wakeLinkSet: boolean; deliveryMode: "webhook" | "poll" },
  savedIds: ReadonlySet<string> = new Set(),
) =>
  renderToStaticMarkup(
    createElement(AwcProjectAccessMemberWakeLinkSlot, {
      projectId: "p1",
      member: { id: "m1", isAgent: true, projectDisplayName: "Coder", ...member },
      wakeLinks: { request: null, savedIds, onSaved: vi.fn() },
    }),
  );

describe("member slot display truth (no wake claim without a link)", () => {
  it("webhook seat with no link: Wakes up on its own is NOT checked", () => {
    const html = render({ wakeLinkSet: false, deliveryMode: "webhook" });
    expect(radio(html, "webhook")).not.toContain("checked");
    expect(radio(html, "poll")).toContain("checked");
  });

  it("webhook seat with a link: Wakes up on its own is checked", () => {
    const html = render({ wakeLinkSet: true, deliveryMode: "webhook" });
    expect(radio(html, "webhook")).toContain("checked");
  });

  it("poll seat with a link stays on Checks on demand", () => {
    const html = render({ wakeLinkSet: true, deliveryMode: "poll" });
    expect(radio(html, "poll")).toContain("checked");
    expect(radio(html, "webhook")).not.toContain("checked");
  });

  it("wake link saved this session (auto-flip) shows wake", () => {
    const html = render(
      { wakeLinkSet: false, deliveryMode: "poll" },
      new Set(["m1"]),
    );
    expect(radio(html, "webhook")).toContain("checked");
  });
});
