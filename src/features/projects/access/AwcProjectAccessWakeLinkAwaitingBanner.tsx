"use client";

import {
  AWC_GROK_WAKE_AWAITING_COPY,
  formatAwcGrokWakeCopy,
} from "@/features/projects/access/awcGrokWakeAwaitingCopy.constant";
import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";

interface AwaitingMember {
  readonly id: string;
  readonly projectDisplayName: string | null;
}

interface AwcProjectAccessWakeLinkAwaitingBannerProps {
  readonly wakeLinks: {
    /** Member bots still waiting for a wake link. */
    readonly awaiting: readonly AwaitingMember[];
    /** "Add wake link": expand + focus that member's Grok wake link form. */
    readonly focus: (membershipId: string) => void;
  };
}

/** Owner-only: one card per member bot still waiting for its Grok wake link. */
export default function AwcProjectAccessWakeLinkAwaitingBanner({
  wakeLinks,
}: AwcProjectAccessWakeLinkAwaitingBannerProps) {
  const copy = AWC_GROK_WAKE_AWAITING_COPY;
  const members = wakeLinks.awaiting;
  if (members.length === 0) {
    return null;
  }
  return (
    <div className="space-y-2" data-testid="wake-link-awaiting-banners">
      {members.map((member) => {
        const name = member.projectDisplayName;
        return (
          <div
            key={member.id}
            role="status"
            className="space-y-1 rounded-md border border-amber-200/80 bg-amber-50/80 px-3 py-2 text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100"
          >
            <p className="text-sm font-semibold">
              {formatAwcGrokWakeCopy(copy.bannerTitle, name)}
            </p>
            <p className="text-xs">
              {formatAwcGrokWakeCopy(copy.bannerBody, name)}
            </p>
            <p className="text-[11px] opacity-80">
              {formatAwcGrokWakeCopy(copy.path, name)}
            </p>
            <button
              type="button"
              className={AWC_PROJECT_ACCESS_CTA.primary}
              onClick={() => wakeLinks.focus(member.id)}
            >
              {copy.cta}
            </button>
          </div>
        );
      })}
    </div>
  );
}
