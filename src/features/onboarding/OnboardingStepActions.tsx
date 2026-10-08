"use client";

import Link from "next/link";

import OnboardingSkipButton from "@/features/onboarding/OnboardingSkipButton";
import { ONBOARDING_COPY as C } from "@/features/onboarding/onboardingCopy.constant";
import {
  OB_ACT_CLASS,
  OB_PRIMARY_BTN_CLASS,
  OB_SECONDARY_BTN_CLASS,
} from "@/features/onboarding/onboardingShellClasses.constant";

interface OnboardingStepSkip {
  readonly title: string;
  readonly text: string;
  readonly href: string;
}

interface OnboardingStepActionsProps {
  readonly backHref: string;
  readonly skip: OnboardingStepSkip | null;
  readonly nextHref: string | null;
  readonly nextLabel: string;
  readonly nextEnabled: boolean;
  readonly nextWhy: string;
}

const DISABLED_LINK_CLASS = " cursor-not-allowed border-dashed opacity-60";

/** Design action row: Back left; Skip for now + primary action right. */
export default function OnboardingStepActions({
  backHref,
  skip,
  nextHref,
  nextLabel,
  nextEnabled,
  nextWhy,
}: OnboardingStepActionsProps) {
  return (
    <div className={OB_ACT_CLASS}>
      <Link href={backHref} className={OB_SECONDARY_BTN_CLASS}>
        {C.back}
      </Link>
      <div className="flex flex-wrap items-center gap-2">
        {skip ? (
          <OnboardingSkipButton
            className={OB_SECONDARY_BTN_CLASS}
            title={skip.title}
            goLabel={C.skipStepGo}
            confirmText={skip.text}
            href={skip.href}
          />
        ) : null}
        {nextHref ? (
          <Link
            href={nextHref}
            className={
              OB_PRIMARY_BTN_CLASS + (nextEnabled ? "" : DISABLED_LINK_CLASS)
            }
            aria-disabled={nextEnabled ? undefined : true}
            aria-describedby={nextEnabled ? undefined : "ob-next-why"}
            title={nextEnabled ? undefined : nextWhy}
            onClick={(event) => {
              if (!nextEnabled) {
                event.preventDefault();
              }
            }}
          >
            {nextLabel}
          </Link>
        ) : null}
        {nextEnabled ? null : (
          <span id="ob-next-why" className="sr-only">
            {nextWhy}
          </span>
        )}
      </div>
    </div>
  );
}
