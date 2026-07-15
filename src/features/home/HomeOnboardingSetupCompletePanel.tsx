"use client";

import Link from "next/link";

import AppHero from "@/components/surfaces/AppHero";
import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_CTA_PRIMARY_CLASS,
  APP_SURFACE_CTA_SECONDARY_CLASS,
  APP_SURFACE_EYEBROW_TEXT_CLASS,
  APP_SURFACE_TEXT_LINK_CLASS,
  APP_SURFACE_TEXT_LINK_MUTED_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";

interface HomeOnboardingSetupCompletePanelProps {
  readonly onDismiss: () => void;
}

export default function HomeOnboardingSetupCompletePanel({
  onDismiss,
}: HomeOnboardingSetupCompletePanelProps) {
  return (
    <AppHero variant="neutral">
      <p className={APP_SURFACE_EYEBROW_TEXT_CLASS}>Setup complete</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white/90">
        You&apos;re set up
      </h1>
      <p className={`mt-3 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        Your Mac is connected, you have a workflow in Library, and you&apos;ve
        sent a first task. Send more work from the browser, schedule repeats on
        your Mac, or browse guides for your team.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={buildAgentComposerHref()}
          className={APP_SURFACE_CTA_PRIMARY_CLASS}
        >
          Send another task
        </Link>
        <button
          type="button"
          onClick={onDismiss}
          className={APP_SURFACE_CTA_SECONDARY_CLASS}
        >
          Continue to home
        </button>
      </div>
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        <Link href="/automations" className={APP_SURFACE_TEXT_LINK_CLASS}>
          Schedule a workflow →
        </Link>
        <Link href="/showcases" className={APP_SURFACE_TEXT_LINK_CLASS}>
          Browse showcases →
        </Link>
        <Link href="/library" className={APP_SURFACE_TEXT_LINK_MUTED_CLASS}>
          Open Library →
        </Link>
        <Link href="/reports" className={APP_SURFACE_TEXT_LINK_MUTED_CLASS}>
          View job history →
        </Link>
      </div>
    </AppHero>
  );
}
