import { describe, expect, it } from "vitest";

import {
  SIGN_IN_EMAIL_BRAND_COLOR,
  SIGN_IN_EMAIL_FONT_FAMILY,
  SIGN_IN_EMAIL_LOGO_PATH,
} from "./signInEmailBrand.constant";
import buildSignInEmailLayoutStyles from "./buildSignInEmailLayoutStyles";

describe("buildSignInEmailLayoutStyles", () => {
  it("uses Agent Witch zinc marketing palette", () => {
    const styles = buildSignInEmailLayoutStyles();

    expect(styles.heading).toContain(SIGN_IN_EMAIL_BRAND_COLOR);
    expect(styles.bodyText).toContain("#52525b");
    expect(styles.mutedText).toContain("#71717a");
    expect(styles.card).toContain("border-radius: 16px");
    expect(styles.button).toContain(SIGN_IN_EMAIL_FONT_FAMILY);
    expect(SIGN_IN_EMAIL_LOGO_PATH).toContain("agent-witch-email-logo.svg");
    expect(SIGN_IN_EMAIL_BRAND_COLOR).toBe("#18181b");
  });
});
