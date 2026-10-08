import type { ReactNode } from "react";

import OnboardingNetBanner from "@/features/onboarding/OnboardingNetBanner";
import { ONBOARDING_COPY as C } from "@/features/onboarding/onboardingCopy.constant";
import OnboardingProgress from "@/features/onboarding/OnboardingProgress";
import OnboardingTopBar from "@/features/onboarding/OnboardingTopBar";
import type { OnboardingStepId } from "@/features/onboarding/onboardingSteps.constant";
import {
  OB_MAIN_CLASS,
  OB_SHELL_CLASS,
} from "@/features/onboarding/onboardingShellClasses.constant";

interface OnboardingShellProps {
  readonly active: OnboardingStepId;
  readonly projectId: string | null;
  readonly skipConfirmText: string;
  readonly userInitial: string;
  readonly userLabel: string;
  readonly children: ReactNode;
}

/** Focused onboarding chrome (Claude HTML) — does not replace AppShell live nav. */
export default function OnboardingShell({
  active,
  projectId,
  skipConfirmText,
  userInitial,
  userLabel,
  children,
}: OnboardingShellProps) {
  return (
    <div className={OB_SHELL_CLASS}>
      <a
        href="#ob-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-awc-blue-600 focus:px-4 focus:py-2 focus:font-semibold focus:text-white"
      >
        {C.skipToContent}
      </a>
      <OnboardingTopBar
        skipConfirmText={skipConfirmText}
        userInitial={userInitial}
        userLabel={userLabel}
      />
      <OnboardingProgress active={active} projectId={projectId} />
      <main id="ob-main" tabIndex={-1} className={OB_MAIN_CLASS}>
        <OnboardingNetBanner />
        {children}
      </main>
    </div>
  );
}
