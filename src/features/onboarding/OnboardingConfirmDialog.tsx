"use client";

import { useEffect, useRef } from "react";

import { ONBOARDING_COPY as C } from "@/features/onboarding/onboardingCopy.constant";
import {
  OB_PRIMARY_BTN_CLASS,
  OB_SECONDARY_BTN_CLASS,
} from "@/features/onboarding/onboardingShellClasses.constant";

interface OnboardingConfirmDialogProps {
  readonly title: string;
  readonly text: string;
  readonly goLabel: string;
  readonly onCancel: () => void;
  readonly onConfirm: () => void;
}

/** Skip confirmation: Escape cancels, focus starts on Cancel. */
export default function OnboardingConfirmDialog({
  title,
  text,
  goLabel,
  onCancel,
  onConfirm,
}: OnboardingConfirmDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    cancelRef.current?.focus();
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ob-skip-title"
      aria-describedby="ob-skip-text"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          onCancel();
        }
      }}
    >
      <div className="w-full max-w-md rounded-[20px] bg-awc-surface p-5 shadow-awc-overlay">
        <h2 id="ob-skip-title" className="text-lg font-semibold text-awc-fg">
          {title}
        </h2>
        <p id="ob-skip-text" className="mt-2 text-sm text-awc-fg-muted">
          {text}
        </p>
        <div className="mt-4 flex flex-wrap justify-end gap-2">
          <button
            ref={cancelRef}
            type="button"
            className={OB_SECONDARY_BTN_CLASS}
            onClick={onCancel}
          >
            {C.cancel}
          </button>
          <button
            type="button"
            className={OB_PRIMARY_BTN_CLASS}
            onClick={onConfirm}
          >
            {goLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
