import { buildSignInHref } from "@/features/empty-states/buildGuestAuthHrefs";
import { buildPostAuthReturn } from "@/lib/auth/buildPostAuthReturn";

export const homeMarketingSignInCallbackHomeHref = buildSignInHref(
  buildPostAuthReturn({ next: "/" }),
);

export const homeMarketingSignInCallbackAutomationsHref = buildSignInHref(
  buildPostAuthReturn({ next: "/automations" }),
);

export const homeMarketingSignInCallbackMarketplaceHref = buildSignInHref(
  buildPostAuthReturn({ next: "/marketplace" }),
);
