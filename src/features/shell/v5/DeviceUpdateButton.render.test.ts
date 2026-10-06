import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import DeviceUpdateButton from "@/features/shell/v5/DeviceUpdateButton";

const render = (
  action: Parameters<typeof DeviceUpdateButton>[0]["action"],
): string =>
  renderToStaticMarkup(createElement(DeviceUpdateButton, { action }));

describe("DeviceUpdateButton (#29 disabled + reason)", () => {
  it("renders disabled Update with the reason always visible", () => {
    const html = render({
      kind: "disabled",
      reason: "Offline — update when it's back.",
    });
    expect(html).toContain("disabled");
    expect(html).toContain('aria-disabled="true"');
    expect(html).toContain("awc-disabled");
    expect(html).toContain("Offline — update when it&#x27;s back.");
    const describedBy = /aria-describedby="([^"]+)"/.exec(html)?.[1];
    expect(describedBy).toBeTruthy();
    expect(html).toContain(`id="${describedBy}"`);
  });

  it("renders an enabled Update without a reason", () => {
    const html = render({ kind: "enabled" });
    expect(html).toContain(">Update</button>");
    expect(html).not.toContain("disabled");
    expect(html).not.toContain("aria-describedby");
  });

  it("renders nothing when hidden", () => {
    expect(render({ kind: "hidden" })).toBe("");
  });
});
