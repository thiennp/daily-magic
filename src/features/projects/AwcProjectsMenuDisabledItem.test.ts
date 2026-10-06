import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AwcProjectsMenuDisabledItem from "@/features/projects/AwcProjectsMenuDisabledItem";

const render = (props: Parameters<typeof AwcProjectsMenuDisabledItem>[0]): string =>
  renderToStaticMarkup(
    createElement("ul", { role: "menu" }, createElement(AwcProjectsMenuDisabledItem, props)),
  );

describe("AwcProjectsMenuDisabledItem (PP-1 I7)", () => {
  it("is aria-disabled (still focusable) with muted V5 tokens", () => {
    const html = render({ label: "Edit on Mac", reason: "Reconnecting…" });
    expect(html).toContain('role="menuitem"');
    expect(html).toContain('aria-disabled="true"');
    expect(html).not.toMatch(/\sdisabled=""/);
    expect(html).toContain("awc-disabled");
  });

  it("wires the visible (i) reason through aria-describedby", () => {
    const html = render({ label: "Edit on Mac", reason: "Connect a computer to edit this project." });
    const describedBy = /aria-describedby="([^"]+)"/.exec(html)?.[1];
    expect(describedBy).toBeTruthy();
    expect(html).toContain(`id="${describedBy}"`);
    expect(html).toContain('role="tooltip"');
    expect(html).toContain("Connect a computer to edit this project.");
    expect(html).toMatch(/aria-hidden="true"[^>]*>i<\/span>/);
  });

  it("falls back to an external describer when there is no reason text", () => {
    const html = render({ label: "Edit on Mac", reason: null, fallbackDescribedById: "helper-1" });
    expect(html).toContain('aria-describedby="helper-1"');
    expect(html).not.toContain('role="tooltip"');
  });
});
