"use client";

import { useMemo, useState } from "react";

import AwcProjectPitfallAccordionRow from "@/features/projects/pitfalls/AwcProjectPitfallAccordionRow";
import AwcProjectPitfallsManageButton from "@/features/projects/pitfalls/AwcProjectPitfallsManageButton";
import AwcProjectPitfallsToolbar from "@/features/projects/pitfalls/AwcProjectPitfallsToolbar";
import { AWC_PROJECT_PITFALLS_COPY as C } from "@/features/projects/pitfalls/awcProjectPitfallsCopy.constant";
import buildAwcProjectPitfallRows from "@/features/projects/pitfalls/buildAwcProjectPitfallRows";
import filterAwcProjectPitfallRows, {
  countAwcPitfallRowsBySeverity,
  type AwcPitfallSeverityFilter,
} from "@/features/projects/pitfalls/filterAwcProjectPitfallRows";
import { PITFALL_EMPTY_CLASS } from "@/features/projects/pitfalls/pitfallsChrome.constant";
import type { AwcProjectPitfallsState } from "@/features/projects/pitfalls/useAwcProjectPitfalls";
import type { ProjectEditOnMacCta } from "@/features/projects/utils/resolveProjectEditOnMacCta";
import withProjectEditOnMacTab from "@/features/projects/utils/withProjectEditOnMacTab";
import { PROJECT_PITFALL_MAX_ACTIVE } from "@agent-witch/shared/pitfalls";

interface AwcProjectPitfallsPanelProps {
  readonly projectId: string;
  readonly pitfalls: AwcProjectPitfallsState;
  readonly deviceDisplayName: string;
  readonly editCta: ProjectEditOnMacCta;
}

/**
 * Safety rules tab: filter chips, search, note + edit link, accordion rows.
 * On/off and edits stay in Agent Witch Local.
 */
export default function AwcProjectPitfallsPanel({
  projectId,
  pitfalls,
  deviceDisplayName,
  editCta,
}: AwcProjectPitfallsPanelProps) {
  void deviceDisplayName;
  const [filter, setFilter] = useState<AwcPitfallSeverityFilter>("all");
  const [query, setQuery] = useState("");
  const rows = useMemo(
    () =>
      pitfalls.status === "ready"
        ? buildAwcProjectPitfallRows(pitfalls.items)
        : [],
    [pitfalls],
  );
  const counts = useMemo(() => countAwcPitfallRowsBySeverity(rows), [rows]);
  const visible = useMemo(
    () => filterAwcProjectPitfallRows(rows, filter, query),
    [rows, filter, query],
  );
  const manageCta = withProjectEditOnMacTab(editCta, projectId, "pitfalls");
  const anyHit = rows.some((row) => row.hitCount > 0);

  return (
    <section className="flex min-w-0 flex-col gap-3" aria-label={C.title}>
      {pitfalls.status === "loading" ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">{C.loading}</p>
      ) : pitfalls.status === "hidden" ? (
        <p className={PITFALL_EMPTY_CLASS}>{C.unavailable}</p>
      ) : rows.length === 0 ? (
        <p className={PITFALL_EMPTY_CLASS}>{C.empty}</p>
      ) : (
        <>
          <AwcProjectPitfallsToolbar
            counts={counts}
            filter={filter}
            query={query}
            onFilterChange={setFilter}
            onQueryChange={setQuery}
          />
          <p className="text-[13px] text-gray-500 dark:text-gray-400">
            {C.panelHint(rows.length, PROJECT_PITFALL_MAX_ACTIVE)}{" "}
            {anyHit ? C.panelHintHasHits : C.panelHintNoHits}{" "}
            <AwcProjectPitfallsManageButton editCta={manageCta} />
          </p>
          {visible.length === 0 ? (
            <p className={PITFALL_EMPTY_CLASS}>{C.noMatch}</p>
          ) : (
            <ul className="flex flex-col rounded-2xl bg-gray-50/80 dark:bg-white/[0.03]">
              {visible.map((row) => (
                <AwcProjectPitfallAccordionRow key={row.id} row={row} />
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}
