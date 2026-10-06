import type { ReactNode } from "react";

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
      <a href="#ob-main" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <OnboardingTopBar
        skipConfirmText={skipConfirmText}
        userInitial={userInitial}
        userLabel={userLabel}
      />
      <OnboardingProgress active={active} projectId={projectId} />
      <main id="ob-main" tabIndex={-1} className={OB_MAIN_CLASS}>
        {children}
      </main>
    </div>
  );
}
