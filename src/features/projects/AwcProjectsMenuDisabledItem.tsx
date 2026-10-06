"use client";

import { useId } from "react";

import {
  PROJECTS_V5_MENU_ITEM_DISABLED_CLASS,
  PROJECTS_V5_MENU_REASON_CLASS,
  PROJECTS_V5_MENU_REASON_ICON_CLASS,
} from "@/features/projects/projectsPageV5Classes.constant";

interface AwcProjectsMenuDisabledItemProps {
  readonly label: string;
  /** Why the action is unavailable. Shown on (i) hover / focus; always read by SR. */
  readonly reason: string | null;
  /** Fallback describer id when there is no reason text (e.g. card helper line). */
  readonly fallbackDescribedById?: string;
}

/**
 * Disabled menu row primitive (PP-1, I7). Muted V5 disabled tokens plus a
 * visible (i) reason slot wired through `aria-describedby`. Uses
 * `aria-disabled` (not `disabled`) so keyboard and SR users can still reach
 * the row and hear why — the reason is never toast-only.
 */
export default function AwcProjectsMenuDisabledItem({
  label,
  reason,
  fallbackDescribedById,
}: AwcProjectsMenuDisabledItemProps) {
  const reasonId = useId();
  const hasReason = reason !== null && reason.trim() !== "";
  const describedBy = hasReason ? reasonId : fallbackDescribedById;

  return (
    <li role="none" className="group relative">
      <button
        type="button"
        role="menuitem"
        aria-disabled="true"
        aria-describedby={describedBy}
        className={PROJECTS_V5_MENU_ITEM_DISABLED_CLASS}
        onClick={(event) => {
          event.preventDefault();
        }}
      >
        <span className="min-w-0 truncate">{label}</span>
        {hasReason ? (
          <span aria-hidden="true" className={PROJECTS_V5_MENU_REASON_ICON_CLASS}>
            i
          </span>
        ) : null}
      </button>
      {hasReason ? (
        <span id={reasonId} role="tooltip" className={PROJECTS_V5_MENU_REASON_CLASS}>
          {reason}
        </span>
      ) : null}
    </li>
  );
}
