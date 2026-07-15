"use client";

import Link from "next/link";

import { Modal } from "@/components/ui/modal";
import {
  MARKETING_CTA_GHOST_CLASSES,
  MARKETING_CTA_PRIMARY_CLASSES,
  MARKETING_CTA_SECONDARY_CLASSES,
} from "@/features/marketing/marketingInteractiveClasses.constant";
import {
  MARKETING_TEXT_PRIMARY_CLASSES,
  MARKETING_TEXT_SECONDARY_CLASSES,
} from "@/features/marketing/marketingSurfaceClasses.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

import type { HomePopularPresetSummary } from "@/features/home/utils/resolveHomePopularPresets";

interface HomeMarketingPopularPresetSignInDialogProps {
  readonly preset: HomePopularPresetSummary | null;
  readonly onClose: () => void;
}

export default function HomeMarketingPopularPresetSignInDialog({
  preset,
  onClose,
}: HomeMarketingPopularPresetSignInDialogProps) {
  if (!preset) {
    return null;
  }

  const loginHref = `/login?callbackUrl=${encodeURIComponent("/marketplace")}`;

  return (
    <Modal isOpen onClose={onClose} className="max-w-md p-6 sm:p-8">
      <h2
        id="popular-preset-sign-in-title"
        className={mergeMarketingClasses(
          "text-xl font-semibold tracking-[-0.02em]",
          MARKETING_TEXT_PRIMARY_CLASSES,
        )}
      >
        Sign in to use this workflow
      </h2>
      <p
        className={mergeMarketingClasses(
          "mt-2 text-sm font-medium",
          MARKETING_TEXT_PRIMARY_CLASSES,
        )}
      >
        {preset.name}
      </p>
      <p
        className={mergeMarketingClasses(
          "mt-2 text-sm leading-relaxed",
          MARKETING_TEXT_SECONDARY_CLASSES,
        )}
      >
        Create a free account or sign in to save{" "}
        <span className="font-medium">{preset.name}</span> to your library and
        run it on your Mac.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link href={loginHref} className={MARKETING_CTA_PRIMARY_CLASSES}>
          Sign in
        </Link>
        <Link href="/#get-started" className={MARKETING_CTA_SECONDARY_CLASSES}>
          Register on this page
        </Link>
      </div>
      <button
        type="button"
        onClick={onClose}
        className={mergeMarketingClasses("mt-4", MARKETING_CTA_GHOST_CLASSES)}
      >
        Not now
      </button>
    </Modal>
  );
}
