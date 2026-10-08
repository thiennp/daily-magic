"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import OnboardingConfirmDialog from "@/features/onboarding/OnboardingConfirmDialog";
import { ONBOARDING_COPY as C } from "@/features/onboarding/onboardingCopy.constant";
import { OB_SECONDARY_BTN_CLASS } from "@/features/onboarding/onboardingShellClasses.constant";

interface OnboardingSkipButtonProps {
  readonly confirmText: string;
  /** Step-row skip: own title + label + destination; default = top bar → Home. */
  readonly title?: string;
  readonly goLabel?: string;
  readonly href?: string;
  readonly className?: string;
}

/** Skip → confirm → next step (step row) or Home (top bar). */
export default function OnboardingSkipButton({
  confirmText,
  title = C.skipConfirmTitle,
  goLabel = C.skipConfirmGo,
  href = "/",
  className = `${OB_SECONDARY_BTN_CLASS} h-9 px-3 text-xs`,
}: OnboardingSkipButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {C.skipForNow}
      </button>
      {open ? (
        <OnboardingConfirmDialog
          title={title}
          text={confirmText}
          goLabel={goLabel}
          onCancel={() => setOpen(false)}
          onConfirm={() => router.push(href)}
        />
      ) : null}
    </>
  );
}
