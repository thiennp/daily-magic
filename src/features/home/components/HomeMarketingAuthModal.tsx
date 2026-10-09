"use client";

import { Suspense, useState } from "react";

import { Modal } from "@/components/ui/modal";
import HomeMarketingLoginForm from "@/features/home/components/HomeMarketingLoginForm";
import type { MarketingAuthMode } from "@/features/marketing/MarketingAuthModalContext";
import {
  MARKETING_TEXT_PRIMARY_CLASSES,
  MARKETING_TEXT_SECONDARY_CLASSES,
} from "@/features/marketing/marketingSurfaceClasses.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

import HomeMarketingAuthModeSwitch from "./HomeMarketingAuthModeSwitch";
import HomeMarketingAuthTermsCheck from "./HomeMarketingAuthTermsCheck";

interface HomeMarketingAuthModalProps {
  readonly mode: MarketingAuthMode;
  readonly note: string;
  readonly onModeChange: (mode: MarketingAuthMode) => void;
  readonly onClose: () => void;
}

/** Design auth dialog: wraps the existing magic-link / Google form. */
export default function HomeMarketingAuthModal({
  mode,
  note,
  onModeChange,
  onClose,
}: HomeMarketingAuthModalProps) {
  const [agreed, setAgreed] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const isSignUp = mode === "up";

  return (
    <Modal isOpen onClose={onClose} className="max-w-md p-6 sm:p-8">
      <h2
        id="home-auth-modal-title"
        className={mergeMarketingClasses(
          "pr-10 text-xl font-semibold tracking-[-0.02em]",
          MARKETING_TEXT_PRIMARY_CLASSES,
        )}
      >
        {isSignUp ? "Create your free account" : "Sign in"}
      </h2>
      <div className="mt-4 space-y-4">
        <HomeMarketingAuthModeSwitch mode={mode} onChange={onModeChange} />
        {note ? (
          <p
            className={mergeMarketingClasses(
              "text-sm",
              MARKETING_TEXT_SECONDARY_CLASSES,
            )}
          >
            {note}
          </p>
        ) : null}
        {isSignUp ? (
          <HomeMarketingAuthTermsCheck
            agreed={agreed}
            error={termsError}
            onChange={(next) => {
              setAgreed(next);
              setTermsError(false);
            }}
          />
        ) : null}
        <Suspense fallback={<p role="status">Loading sign-in form…</p>}>
          <HomeMarketingLoginForm
            termsGate={
              isSignUp
                ? { agreed, onMissing: () => setTermsError(true) }
                : undefined
            }
          />
        </Suspense>
      </div>
    </Modal>
  );
}
