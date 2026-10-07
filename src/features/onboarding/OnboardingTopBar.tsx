import Link from "next/link";

import OnboardingSkipButton from "@/features/onboarding/OnboardingSkipButton";
import { OB_BRAND_CLASS, OB_TOP_CLASS } from "@/features/onboarding/onboardingShellClasses.constant";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

interface OnboardingTopBarProps {
  readonly skipConfirmText: string;
  readonly userInitial: string;
  readonly userLabel: string;
}

export default function OnboardingTopBar({
  skipConfirmText,
  userInitial,
  userLabel,
}: OnboardingTopBarProps) {
  return (
    <header className={OB_TOP_CLASS}>
      <Link href="/" className={OB_BRAND_CLASS}>
        <span
          className="grid h-[30px] w-[30px] place-items-center rounded-lg bg-gradient-to-br from-awc-accent-soft to-awc-accent-soft-2 text-awc-blue-700"
          aria-hidden="true"
        >
          ◆
        </span>
        {AGENT_WITCH_PRODUCT_NAME}
      </Link>
      <div className="flex items-center gap-3">
        <OnboardingSkipButton confirmText={skipConfirmText} />
        <span className="inline-flex items-center gap-2 text-sm text-awc-fg">
          <span
            className="grid h-8 w-8 place-items-center rounded-full bg-awc-accent-soft text-xs font-bold text-awc-blue-800"
            aria-hidden="true"
          >
            {userInitial}
          </span>
          <span className="hidden sm:inline">{userLabel}</span>
        </span>
      </div>
    </header>
  );
}
