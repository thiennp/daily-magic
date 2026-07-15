import { describe, expect, it } from "vitest";

import { SIGN_IN_EMAIL_BRAND_COLOR } from "./signInEmailBrand.constant";
import resolveSignInEmailBrandColor from "./resolveSignInEmailBrandColor";

describe("resolveSignInEmailBrandColor", () => {
  it("uses the app brand color by default", () => {
    expect(resolveSignInEmailBrandColor()).toBe(SIGN_IN_EMAIL_BRAND_COLOR);
  });

  it("accepts a valid theme color", () => {
    expect(resolveSignInEmailBrandColor({ brandColor: "#112233" })).toBe(
      "#112233",
    );
  });

  it("rejects unsafe theme colors", () => {
    expect(
      resolveSignInEmailBrandColor({
        brandColor: "red; background: url(javascript:alert(1))",
      }),
    ).toBe(SIGN_IN_EMAIL_BRAND_COLOR);
  });
});
