"use client";

import { useId } from "react";

import { PROJECT_PAGE_V5_CHROME_COPY as C } from "@/features/projects/projectPageV5ChromeCopy.constant";
import {
  PROJECT_V5_PILL_BUTTON_CLASS,
  PROJECT_V5_REASON_CLASS,
} from "@/features/projects/projectPageV5ChromeClasses.constant";
import {
  shouldShowProjectEditOnMacHelperText,
  type ProjectEditOnMacCta,
} from "@/features/projects/utils/resolveProjectEditOnMacCta";

/**
 * V5-3: the ONE header action — "Edit on this computer". Disabled looks
 * disabled (`.awc-disabled`, #29) and keeps its reason visible (not hover).
 * Offline / reconnecting reasons are the status chip right beside it.
 */
export default function AwcProjectHeaderEditAction({
  editCta,
}: {
  readonly editCta: ProjectEditOnMacCta;
}) {
  const reasonId = useId();
  const label = C["header.edit"];
  if (editCta.href !== null) {
    return (
      <a
        href={editCta.href}
        target="_blank"
        rel="noopener noreferrer"
        className={PROJECT_V5_PILL_BUTTON_CLASS}
      >
        {label}
      </a>
    );
  }
  const reason =
    editCta.helperText !== null &&
    shouldShowProjectEditOnMacHelperText(editCta.state)
      ? editCta.helperText
      : null;
  return (
    <div className="flex w-full min-w-0 flex-col gap-1 sm:w-auto sm:items-end">
      <button
        type="button"
        disabled
        aria-describedby={reason !== null ? reasonId : undefined}
        className={`${PROJECT_V5_PILL_BUTTON_CLASS} awc-disabled`}
      >
        {label}
      </button>
      {reason !== null ? (
        <p id={reasonId} className={PROJECT_V5_REASON_CLASS}>
          {reason}
        </p>
      ) : null}
    </div>
  );
}
