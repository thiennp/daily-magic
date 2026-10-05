"use client";

import { useMemo, useState } from "react";

import { OVERVIEW_CARD_CLASS } from "@/features/projects/overview/overviewChrome.constant";
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
 * Pitfalls tab: read-only registry with severity chips, keyword search and
 * accordion rows. Turning pitfalls on/off and editing stays in Agent Witch Local.
 */
export default function AwcProjectPitfallsPanel({
  projectId,
  pitfalls,
  deviceDisplayName,
  editCta,
}: AwcProjectPitfallsPanelProps) {
  const [filter, setFilter] = useState<AwcPitfallSeverityFilter>("all");
  const [query, setQuery] = useState("");
  const rows = useMemo(
    () => (pitfalls.status === "ready" ? buildAwcProjectPitfallRows(pitfalls.items) : []),
    [pitfalls],
  );
  const counts = useMemo(() => countAwcPitfallRowsBySeverity(rows), [rows]);
  const visible = useMemo(
    () => filterAwcProjectPitfallRows(rows, filter, query),
    [rows, filter, query],
  );
  const manageCta = withProjectEditOnMacTab(editCta, projectId, "pitfalls");

  return (
    <section className={OVERVIEW_CARD_CLASS} aria-labelledby="project-pitfalls-title">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 max-w-xl">
          <h2
            id="project-pitfalls-title"
            className="text-[17px] font-semibold tracking-tight text-gray-900 dark:text-white"
          >
            {C.title}
          </h2>
          <p className="mt-1 text-[13px] text-gray-500 dark:text-gray-400">
            {pitfalls.status === "ready"
              ? C.panelHint(rows.length, PROJECT_PITFALL_MAX_ACTIVE, deviceDisplayName)
              : C.hint(deviceDisplayName)}
          </p>
        </div>
        <AwcProjectPitfallsManageButton editCta={manageCta} />
      </div>
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
          {visible.length === 0 ? (
            <p className={PITFALL_EMPTY_CLASS}>{C.noMatch}</p>
          ) : (
            <ul className="flex flex-col">
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
