import { describe, expect, it } from "vitest";

import resolveProjectEditOnMacLinkProps from "@/features/projects/utils/resolveProjectEditOnMacLinkProps";

describe("resolveProjectEditOnMacLinkProps (DF-033)", () => {
  it("opens agentwitch-local:// deep links in place (no empty tab)", () => {
    expect(
      resolveProjectEditOnMacLinkProps("agentwitch-local://status?project=p1"),
    ).toEqual({});
  });
  it("keeps a new tab for web hrefs", () => {
    expect(resolveProjectEditOnMacLinkProps("/#awc-connect")).toEqual({
      target: "_blank",
      rel: "noopener noreferrer",
    });
  });
});
