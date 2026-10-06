"use client";

import type { OverviewAttention } from "@/features/projects/overview/buildOverviewAttention";
import { OVERVIEW_CTA_PRIMARY_SM_CLASS } from "@/features/projects/overview/overviewChrome.constant";
import { PROJECT_PAGE_OVERVIEW_COPY as C } from "@/features/projects/overview/projectPageOverviewCopy.constant";

interface Props {
  readonly attention: OverviewAttention;
  readonly onOpen: () => void;
}

export default function AwcProjectOverviewAttentionBanner({
  attention,
  onOpen,
}: Props) {
  return (
    <section
      className="flex gap-3 rounded-awc-card bg-awc-attention-bg px-4 py-3.5 text-awc-warn shadow-[0_0_0_1px_rgba(184,106,0,.18)]"
      role="status"
      aria-label={C.attentionTitle}
    >
      <div className="min-w-0 flex-1">
        <h3 className="mb-1.5 text-[length:var(--awc-fs-sm)] font-semibold text-awc-warn">
          {C.attentionTitle}
        </h3>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="min-w-0 text-sm text-awc-fg dark:text-gray-100">
            {C.attentionWaiting(attention.assistantName)}
          </p>
          <button
            type="button"
            className={OVERVIEW_CTA_PRIMARY_SM_CLASS}
            onClick={onOpen}
          >
            {C.attentionOpen}
          </button>
        </div>
      </div>
    </section>
  );
}
