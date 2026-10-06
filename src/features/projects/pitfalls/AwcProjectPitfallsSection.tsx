"use client";

import AwcProjectDetailSection from "@/features/projects/AwcProjectDetailSection";
import AwcProjectEditOnMacActions from "@/features/projects/AwcProjectEditOnMacActions";
import AwcProjectPitfallRow from "@/features/projects/pitfalls/AwcProjectPitfallRow";
import { AWC_PROJECT_PITFALLS_COPY } from "@/features/projects/pitfalls/awcProjectPitfallsCopy.constant";
import buildAwcProjectPitfallRows from "@/features/projects/pitfalls/buildAwcProjectPitfallRows";
import useAwcProjectPitfalls from "@/features/projects/pitfalls/useAwcProjectPitfalls";
import type { ProjectEditOnMacCta } from "@/features/projects/utils/resolveProjectEditOnMacCta";
import withProjectEditOnMacTab from "@/features/projects/utils/withProjectEditOnMacTab";

interface AwcProjectPitfallsSectionProps {
  readonly projectId: string;
  readonly deviceDisplayName: string;
  readonly editCta: ProjectEditOnMacCta;
}

/**
 * Read-only pitfall registry on the AWC project page. Editing happens in
 * AgentWitch Local (Pitfalls tab); Cloud is the source of truth.
 */
export default function AwcProjectPitfallsSection({
  projectId,
  deviceDisplayName,
  editCta,
}: AwcProjectPitfallsSectionProps) {
  const state = useAwcProjectPitfalls(projectId);

  if (state.status === "hidden") {
    return null;
  }

  const rows =
    state.status === "ready" ? buildAwcProjectPitfallRows(state.items) : [];
  const pitfallsEditCta = withProjectEditOnMacTab(
    editCta,
    projectId,
    "pitfalls",
  );

  return (
    <AwcProjectDetailSection
      title={AWC_PROJECT_PITFALLS_COPY.title}
      hint={AWC_PROJECT_PITFALLS_COPY.hint(deviceDisplayName)}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {state.status === "loading"
            ? AWC_PROJECT_PITFALLS_COPY.loading
            : AWC_PROJECT_PITFALLS_COPY.activeCount(
                rows.length,
                state.status === "ready" ? state.items.length : 0,
              )}
        </p>
        <AwcProjectEditOnMacActions
          editCta={pitfallsEditCta}
          size="compact"
          layout="buttonOnly"
          fullWidthOnMobile
        />
      </div>
      {state.status === "ready" && rows.length === 0 ? (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {AWC_PROJECT_PITFALLS_COPY.empty}
        </p>
      ) : null}
      {rows.length > 0 ? (
        <ul className="space-y-2 text-sm text-gray-800 dark:text-gray-100">
          {rows.map((row) => (
            <AwcProjectPitfallRow key={row.id} row={row} />
          ))}
        </ul>
      ) : null}
    </AwcProjectDetailSection>
  );
}
