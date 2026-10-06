"use client";

import type { OverviewAssistantRow } from "@/features/projects/overview/buildOverviewAssistants";
import formatOverviewWhen from "@/features/projects/overview/formatOverviewWhen";
import {
  OVERVIEW_CARD_CLASS,
  OVERVIEW_CTA_GHOST_SM_CLASS,
  OVERVIEW_CTA_SECONDARY_SM_CLASS,
} from "@/features/projects/overview/overviewChrome.constant";
import { PROJECT_PAGE_OVERVIEW_COPY as C } from "@/features/projects/overview/projectPageOverviewCopy.constant";

interface Props {
  readonly assistants: readonly OverviewAssistantRow[];
  readonly canSend: boolean;
  readonly onMessage: (membershipId: string) => void;
  readonly onGotoTeam: () => void;
}

const subLine = (row: OverviewAssistantRow): string => {
  if (row.status === "silent") {
    return C.assistantsSilent;
  }
  const when = formatOverviewWhen(row.lastAt);
  if (when !== null) {
    return C.assistantsLastTask(when);
  }
  return C.assistantsNoTasks;
};

export default function AwcProjectOverviewAssistantsCard({
  assistants,
  canSend,
  onMessage,
  onGotoTeam,
}: Props) {
  return (
    <section className={OVERVIEW_CARD_CLASS} aria-labelledby="overview-assistants-h">
      <div className="flex items-center justify-between gap-2">
        <h3
          id="overview-assistants-h"
          className="text-[15.5px] font-semibold text-awc-fg dark:text-white"
        >
          {C["overview.assistantsCard"]}
        </h3>
        <button type="button" className={OVERVIEW_CTA_GHOST_SM_CLASS} onClick={onGotoTeam}>
          {C.assistantsTeam}
        </button>
      </div>
      {assistants.length === 0 ? (
        <div className="flex flex-wrap items-center justify-between gap-2 py-1">
          <p className="text-[13px] text-awc-fg-muted">{C.assistantsEmpty}</p>
          <button type="button" className={OVERVIEW_CTA_SECONDARY_SM_CLASS} onClick={onGotoTeam}>
            {C.assistantsInvite}
          </button>
        </div>
      ) : (
        <ul className="flex flex-col">
          {assistants.map((row, index) => (
            <li
              key={row.membershipId}
              className={`flex items-center gap-3 py-2.5 ${
                index === 0 ? "" : "border-t border-awc-border dark:border-gray-800"
              }`}
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-awc-tile text-xs font-semibold text-awc-fg dark:bg-white/15 dark:text-gray-200">
                {row.initials}
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-awc-fg dark:text-white">
                  {row.name}
                </div>
                <div className="truncate text-[12.5px] text-awc-fg-muted">{subLine(row)}</div>
              </div>
              {canSend ? (
                <button
                  type="button"
                  className={OVERVIEW_CTA_SECONDARY_SM_CLASS}
                  onClick={() => onMessage(row.membershipId)}
                  aria-label={`${C.assistantsMessage} ${row.name}`}
                >
                  {C.assistantsMessage}
                </button>
              ) : (
                <span className="max-w-[9rem] text-right text-[11.5px] text-awc-fg-subtle">
                  {C["disabled.viewerMessage"]}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
