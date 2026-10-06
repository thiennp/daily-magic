"use client";

import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import { formatInboxArchivedFilterLabel } from "@/features/projects/access/inbox/utils/formatInboxArchivedFilterLabel";

interface AwcProjectInboxArchivedFilterProps {
  readonly archivedCount: number;
  readonly pressed: boolean;
  readonly onToggle: () => void;
}

/** "Archived ({n})" toggle — anyone who can read Messages can open it. */
export default function AwcProjectInboxArchivedFilter({
  archivedCount,
  pressed,
  onToggle,
}: AwcProjectInboxArchivedFilterProps) {
  return (
    <div className="flex justify-end">
      <button
        type="button"
        aria-pressed={pressed}
        className={`${AWC_PROJECT_ACCESS_CTA.secondary} ${pressed ? "bg-gray-100 dark:bg-white/[0.06]" : ""}`}
        onClick={onToggle}
      >
        {formatInboxArchivedFilterLabel(archivedCount)}
      </button>
    </div>
  );
}
