import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import DeviceUpdateButton from "@/features/shell/v5/DeviceUpdateButton";

const render = (
  action: Parameters<typeof DeviceUpdateButton>[0]["action"],
): string =>
  renderToStaticMarkup(createElement(DeviceUpdateButton, { action }));

describe("DeviceUpdateButton (HN-H3 badge / enabled)", () => {
  it("renders an amber Update badge while offline (no greyed button)", () => {
    const html = render({ kind: "badge", label: "Update v268" });
    expect(html).toContain("Update v268");
    expect(html).not.toContain("<button");
    expect(html).not.toContain("disabled");
  });

  it("renders an enabled Update button with the version label", () => {
    const html = render({ kind: "enabled", label: "Update to v268" });
    expect(html).toContain(">Update to v268</button>");
    expect(html).not.toContain("disabled");
    expect(html).not.toContain("aria-describedby");
  });

  it("renders nothing when hidden", () => {
    expect(render({ kind: "hidden" })).toBe("");
  });
});
