"use client";

import { useState } from "react";

import HomeAttentionRow from "@/features/home/HomeAttentionRow";
import HomeStalledJobRow from "@/features/home/HomeStalledJobRow";
import { isAgentRunSweptStale } from "@/lib/dispatch/isAgentRunStalled";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

/** a13083ee: every attention run is counted; the list opens past 8 rows. */
export const HOME_ATTENTION_VISIBLE_ROWS = 8;

export default function HomeAttentionRunRows({
  runs,
  nowMs,
}: {
  readonly runs: readonly AgentRunRecord[];
  readonly nowMs: number;
}) {
  const [showAll, setShowAll] = useState(false);
  const hidden = runs.length - HOME_ATTENTION_VISIBLE_ROWS;
  const visible = showAll ? runs : runs.slice(0, HOME_ATTENTION_VISIBLE_ROWS);
  return (
    <>
      {visible.map((run) =>
        isAgentRunSweptStale(run) ? (
          <HomeStalledJobRow key={run.id} run={run} nowMs={nowMs} />
        ) : (
          <HomeAttentionRow key={run.id} run={run} nowMs={nowMs} />
        ),
      )}
      {hidden > 0 ? (
        <li className="py-2">
          <button
            type="button"
            className="text-sm font-medium text-brand-600 hover:underline dark:text-brand-400"
            aria-expanded={showAll}
            onClick={() => setShowAll((value) => !value)}
          >
            {showAll ? "Show fewer" : `Show ${hidden} more`}
          </button>
        </li>
      ) : null}
    </>
  );
}
