"use client";

import AwcProjectDetailSection from "@/features/projects/AwcProjectDetailSection";
import AwcProjectEditOnMacActions from "@/features/projects/AwcProjectEditOnMacActions";
import { AWC_PROJECT_PITFALLS_COPY } from "@/features/projects/pitfalls/awcProjectPitfallsCopy.constant";
import buildAwcProjectPitfallRows from "@/features/projects/pitfalls/buildAwcProjectPitfallRows";
import useAwcProjectPitfalls from "@/features/projects/pitfalls/useAwcProjectPitfalls";
import type { ProjectEditOnMacCta } from "@/features/projects/utils/resolveProjectEditOnMacCta";
import withProjectEditOnMacTab from "@/features/projects/utils/withProjectEditOnMacTab";
import { PROJECT_PITFALL_MAX_ACTIVE } from "@/lib/projects/pitfalls/projectPitfallLimits.constant";

interface AwcProjectPitfallsSectionProps {
  readonly projectId: string;
  readonly deviceDisplayName: string;
  readonly editCta: ProjectEditOnMacCta;
}

const SEVERITY_BADGE_CLASS = {
  block:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300",
  warn: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300",
  info: "border-gray-200 bg-gray-50 text-gray-600 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-300",
} as const;

/**
 * Read-only pitfall registry on the AWC project page. Editing happens in
 * Agent Witch Local (Pitfalls tab); Cloud is the source of truth.
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
                PROJECT_PITFALL_MAX_ACTIVE,
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
            <li
              key={row.id}
              className="space-y-1 rounded-lg border border-gray-200/70 bg-white/70 px-3 py-2 dark:border-gray-800/70 dark:bg-white/[0.03]"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium">{row.title}</span>
                <span
                  className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${SEVERITY_BADGE_CLASS[row.severity]}`}
                >
                  {row.severityLabel}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {row.sourceLabel}
                </span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-200">
                <span className="font-medium">
                  {AWC_PROJECT_PITFALLS_COPY.fixLabel}:
                </span>{" "}
                {row.fix}
              </p>
              {row.triggers.length > 0 ? (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {AWC_PROJECT_PITFALLS_COPY.triggersLabel}:{" "}
                  {row.triggers.join(", ")}
                </p>
              ) : null}
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {row.lastHitLabel}
              </p>
            </li>
          ))}
        </ul>
      ) : null}
    </AwcProjectDetailSection>
  );
}
