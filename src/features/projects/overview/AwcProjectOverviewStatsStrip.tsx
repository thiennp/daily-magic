"use client";

import type { ProjectPageNavTarget } from "@/features/projects/projectPageTabs.constant";
import {
  OVERVIEW_FACT_CLASS,
  OVERVIEW_FACT_WARN_CLASS,
} from "@/features/projects/overview/overviewChrome.constant";
import { PROJECT_PAGE_OVERVIEW_COPY as C } from "@/features/projects/overview/projectPageOverviewCopy.constant";

export type OverviewStats = {
  readonly memberCount: number;
  readonly pendingCount: number;
  readonly unreadCount: number;
  readonly pitfallsActive: number;
  readonly pitfallsMax: number;
  readonly playbooks: number;
  readonly workflows: number;
  readonly agents: number;
  readonly showComposition: boolean;
  readonly computerStatus: string | null;
  readonly setupHidden: boolean;
  readonly setupDone: number;
  readonly setupTotal: number;
};

interface Props {
  readonly stats: OverviewStats;
  readonly onGoto: (tab: ProjectPageNavTarget) => void;
  /** Unread → Chat dock full view (no Activity tab). */
  readonly onOpenChat: () => void;
  readonly onShowSetup: () => void;
}

export default function AwcProjectOverviewStatsStrip({
  stats: s,
  onGoto,
  onOpenChat,
  onShowSetup,
}: Props) {
  const pending = s.pendingCount > 0 ? ` (${s.pendingCount} pending)` : "";
  const unreadCls = s.unreadCount > 0 ? OVERVIEW_FACT_WARN_CLASS : OVERVIEW_FACT_CLASS;
  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Overview facts">
      <button type="button" className={OVERVIEW_FACT_CLASS} onClick={() => onGoto("team")}>
        <b className="font-semibold tabular-nums text-awc-fg dark:text-white">{s.memberCount}</b>{" "}
        members{pending}
      </button>
      <button type="button" className={unreadCls} onClick={onOpenChat}>
        <b className="font-semibold tabular-nums">{s.unreadCount}</b> unread
      </button>
      {s.pitfallsMax === 0 ? null : (
        <button type="button" className={OVERVIEW_FACT_CLASS} onClick={() => onGoto("pitfalls")}>
          <b className="font-semibold tabular-nums text-awc-fg dark:text-white">{s.pitfallsActive}</b>{" "}
          of {s.pitfallsMax} safety{" "}
          {s.pitfallsMax === 1 ? "rule" : "rules"} on
        </button>
      )}
      {s.showComposition ? (
        <button type="button" className={OVERVIEW_FACT_CLASS} onClick={() => onGoto("library")}>
          {C.compositionStat(s.playbooks, s.workflows, s.agents)}
        </button>
      ) : null}
      {s.computerStatus ? (
        <button type="button" className={OVERVIEW_FACT_CLASS} onClick={() => onGoto("team")}>
          {s.computerStatus}
        </button>
      ) : null}
      {s.setupHidden && s.setupDone < s.setupTotal ? (
        <button type="button" className={OVERVIEW_FACT_CLASS} onClick={onShowSetup}>
          {C.setupShow(s.setupDone, s.setupTotal)}
        </button>
      ) : null}
    </div>
  );
}
