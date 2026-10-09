export const PRICING_PAGE_PATH = "/pricing";

/** Signing in from Pricing lands in the app, never back on Pricing. */
export const PRICING_SIGN_IN_HREF = `/login?callbackUrl=${encodeURIComponent("/")}`;

export const PRICING_SIGNED_IN_TRIAL_HREF = "/";

/** Account creation anchors to Home get-started (existing live CTA). */
export const PRICING_START_TRIAL_HREF = "/#get-started";

export const PRICING_CONTACT_SALES_HREF =
  "mailto:hello@agentwitch.com?subject=AgentWitch%20Team%20volume";
