"use client";

import { useId } from "react";

import { OVERVIEW_CTA_SECONDARY_SM_CLASS } from "@/features/projects/overview/overviewChrome.constant";
import { AWC_PROJECT_PITFALLS_COPY as C } from "@/features/projects/pitfalls/awcProjectPitfallsCopy.constant";
import type { ProjectEditOnMacCta } from "@/features/projects/utils/resolveProjectEditOnMacCta";

/** Gray secondary deep link into the Agent Witch Local Pitfalls tab. */
export default function AwcProjectPitfallsManageButton({
  editCta,
}: {
  readonly editCta: ProjectEditOnMacCta;
}) {
  const helperId = useId();
  if (editCta.href !== null) {
    return (
      <a
        href={editCta.href}
        target="_blank"
        rel="noopener noreferrer"
        className={OVERVIEW_CTA_SECONDARY_SM_CLASS}
      >
        {C.manageOnMac}
      </a>
    );
  }
  return (
    <div className="flex flex-col items-start gap-1 sm:items-end">
      <button
        type="button"
        disabled
        aria-describedby={editCta.helperText !== null ? helperId : undefined}
        className={`${OVERVIEW_CTA_SECONDARY_SM_CLASS} cursor-not-allowed opacity-50`}
      >
        {C.manageOnMac}
      </button>
      {editCta.helperText !== null ? (
        <p id={helperId} className="max-w-xs text-xs text-gray-500 dark:text-gray-400 sm:text-right">
          {editCta.helperText}
        </p>
      ) : null}
    </div>
  );
}
