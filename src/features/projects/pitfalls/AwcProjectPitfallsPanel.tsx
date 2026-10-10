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
import type { ProjectEditOnMacCta } from "@/features/projects/utils/public-api/types";
import { withProjectEditOnMacTab } from "@/features/projects/utils/public-api/presentation";
import { PROJECT_PANEL_SURFACE_CLASS as SURFACE } from "@/features/projects/public-api/types";

interface AwcProjectPitfallsPanelProps {
  readonly projectId: string;
  readonly pitfalls: AwcProjectPitfallsState;
  readonly deviceDisplayName: string;
  readonly editCta: ProjectEditOnMacCta;
  /** Only people who can edit rules get the "edit on this computer" link. */
  readonly canManage?: boolean;
}

/**
 * Safety rules tab: filter chips, search, note + edit link, accordion rows.
 * On/off and edits stay in AgentWitch Local.
 */
export default function AwcProjectPitfallsPanel({
  projectId,
  pitfalls,
  deviceDisplayName,
  editCta,
  canManage = true,
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
        <p className="text-sm text-awc-fg-muted dark:text-gray-400">
          {C.loading}
        </p>
      ) : pitfalls.status === "hidden" ? (
        <p className={PITFALL_EMPTY_CLASS}>{C.unavailable}</p>
      ) : pitfalls.status === "ready" && pitfalls.items.length === 0 ? (
        <p className={PITFALL_EMPTY_CLASS}>{C.empty}</p>
      ) : rows.length === 0 ? (
        <p className={PITFALL_EMPTY_CLASS}>{C.allOff}</p>
      ) : (
        <>
          <AwcProjectPitfallsToolbar
            counts={counts}
            filter={filter}
            query={query}
            onFilterChange={setFilter}
            onQueryChange={setQuery}
          />
          <div className="flex flex-col gap-1 text-[13px] text-awc-fg-muted dark:text-gray-400">
            <p className="m-0">
              {C.panelHint(
                rows.length,
                pitfalls.status === "ready" ? pitfalls.items.length : 0,
              )}{" "}
              {anyHit ? C.panelHintHasHits : C.panelHintNoHits}
            </p>
            {canManage ? (
              <AwcProjectPitfallsManageButton editCta={manageCta} />
            ) : null}
          </div>
          {visible.length === 0 ? (
            <p className={PITFALL_EMPTY_CLASS}>{C.noMatch}</p>
          ) : (
            <ul className={`flex flex-col overflow-hidden ${SURFACE}`}>
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
