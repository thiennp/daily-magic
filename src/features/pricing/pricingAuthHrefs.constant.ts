/** Sign-in / trial entry that returns the visitor to Pricing. */
export const PRICING_PAGE_PATH = "/pricing";

export const PRICING_SIGN_IN_HREF = `/login?callbackUrl=${encodeURIComponent(PRICING_PAGE_PATH)}`;

/** Account creation anchors to Home get-started (existing live CTA). */
export const PRICING_START_TRIAL_HREF = "/#get-started";

export const PRICING_CONTACT_SALES_HREF =
  "mailto:hello@agentwitch.com?subject=AgentWitch%20Team%20volume";
