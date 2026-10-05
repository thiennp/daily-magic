"use client";

import type { OverviewAttention } from "@/features/projects/overview/buildOverviewAttention";
import { OVERVIEW_CTA_PRIMARY_SM_CLASS } from "@/features/projects/overview/overviewChrome.constant";
import { PROJECT_PAGE_OVERVIEW_COPY as C } from "@/features/projects/overview/projectPageOverviewCopy.constant";

interface AwcProjectOverviewAttentionBannerProps {
  readonly attention: OverviewAttention;
  readonly onOpen: () => void;
}

export default function AwcProjectOverviewAttentionBanner({
  attention,
  onOpen,
}: AwcProjectOverviewAttentionBannerProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-gray-100 px-3.5 py-3 dark:bg-white/10">
      <p className="min-w-0 text-sm text-gray-800 dark:text-gray-100">
        <b className="font-semibold">{attention.botName}</b>{" "}
        {C.attentionWaitingSuffix}
      </p>
      <button
        type="button"
        className={OVERVIEW_CTA_PRIMARY_SM_CLASS}
        onClick={onOpen}
      >
        {C.attentionOpen}
      </button>
    </div>
  );
}
