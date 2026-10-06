"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { ONBOARDING_COPY as C } from "@/features/onboarding/onboardingCopy.constant";
import {
  OB_PRIMARY_BTN_CLASS,
  OB_SECONDARY_BTN_CLASS,
} from "@/features/onboarding/onboardingShellClasses.constant";

interface OnboardingSkipButtonProps {
  readonly confirmText: string;
}

/** Skip for now → confirm → Home. Live Home/checklist stay available. */
export default function OnboardingSkipButton({
  confirmText,
}: OnboardingSkipButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={`${OB_SECONDARY_BTN_CLASS} h-9 px-3 text-xs`}
        onClick={() => setOpen(true)}
      >
        {C.skipForNow}
      </button>
      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ob-skip-title"
        >
          <div className="w-full max-w-md rounded-[20px] bg-awc-surface p-5 shadow-awc-overlay">
            <h2 id="ob-skip-title" className="text-lg font-semibold text-awc-fg">
              {C.skipConfirmTitle}
            </h2>
            <p className="mt-2 text-sm text-awc-fg-muted">{confirmText}</p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                className={OB_SECONDARY_BTN_CLASS}
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className={OB_PRIMARY_BTN_CLASS}
                onClick={() => router.push("/")}
              >
                {C.skipConfirmGo}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
