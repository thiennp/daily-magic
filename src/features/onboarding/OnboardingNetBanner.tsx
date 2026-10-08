"use client";

import { useOnboardingOnline } from "@/features/onboarding/hooks/useOnboardingOnline";
import { ONBOARDING_COPY as C } from "@/features/onboarding/onboardingCopy.constant";

/** Design: warning banner on every step while offline. */
export default function OnboardingNetBanner() {
  const online = useOnboardingOnline();
  if (online) {
    return null;
  }
  return (
    <div
      role="status"
      className="flex items-start gap-3 rounded-xl bg-awc-warn-soft px-4 py-3 text-sm text-awc-fg"
    >
      <span
        aria-hidden="true"
        className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-awc-warn-dot"
      />
      <p>
        <b className="font-semibold">{C.offlineBold}</b>
        {C.offlineText}
      </p>
    </div>
  );
}
