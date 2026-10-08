"use client";

import type { OverviewAttentionItem } from "@/features/projects/overview/buildOverviewAttentionItems";
import { OVERVIEW_CTA_PRIMARY_SM_CLASS } from "@/features/projects/overview/overviewChrome.constant";
import { PROJECT_PAGE_OVERVIEW_COPY as C } from "@/features/projects/overview/projectPageOverviewCopy.constant";

interface Props {
  readonly items: readonly OverviewAttentionItem[];
  readonly onOpen: (item: OverviewAttentionItem) => void;
}

const itemText = (item: OverviewAttentionItem): string => {
  switch (item.kind) {
    case "run":
      return C.attentionRunApprovals(item.count);
    case "join":
      return C.attentionJoinRequests(item.count);
    case "skill":
      return C.attentionSkillQuestions(item.count);
    case "unread":
      return C.attentionUnread(item.assistantName);
  }
};

const itemCta = (item: OverviewAttentionItem): string =>
  item.kind === "unread" ? C.attentionOpen : C.attentionReview;

export default function AwcProjectOverviewAttentionBanner({
  items,
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
        <ul className="flex flex-col gap-2">
          {items.map((item) => (
            <li
              key={item.kind}
              className="flex flex-wrap items-center justify-between gap-3"
            >
              <p className="min-w-0 text-sm text-awc-fg dark:text-gray-100">
                {itemText(item)}
              </p>
              <button
                type="button"
                className={OVERVIEW_CTA_PRIMARY_SM_CLASS}
                onClick={() => onOpen(item)}
              >
                {itemCta(item)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
