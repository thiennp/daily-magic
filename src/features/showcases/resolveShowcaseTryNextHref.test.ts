import { describe, expect, it } from "vitest";

import {
  buildShowcaseSignInHref,
  isShowcaseTryNextAuthRequired,
  resolveShowcaseTryNextHref,
} from "@/features/showcases/resolveShowcaseTryNextHref";

describe("resolveShowcaseTryNextHref (SHOWCASES-012)", () => {
  it("wraps send-task and app routes for anonymous readers", () => {
    expect(isShowcaseTryNextAuthRequired("/?sendTask=1")).toBe(true);
    expect(isShowcaseTryNextAuthRequired("/automations")).toBe(true);
    expect(isShowcaseTryNextAuthRequired("/showcases")).toBe(false);

    expect(resolveShowcaseTryNextHref("/?sendTask=1", false)).toBe(
      buildShowcaseSignInHref("/?sendTask=1"),
    );
    expect(resolveShowcaseTryNextHref("/automations", false)).toBe(
      "/login?callbackUrl=%2Fautomations",
    );
  });

  it("keeps destinations for signed-in readers and unwraps login callbacks", () => {
    expect(resolveShowcaseTryNextHref("/?sendTask=1", true)).toBe(
      "/?sendTask=1",
    );
    expect(
      resolveShowcaseTryNextHref("/login?callbackUrl=%2Fautomations", true),
    ).toBe("/automations");
  });
});
