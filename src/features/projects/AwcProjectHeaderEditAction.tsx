"use client";

import { useId } from "react";

import {
  PROJECT_V5_PILL_BUTTON_CLASS,
  PROJECT_V5_REASON_CLASS,
} from "@/features/projects/projectPageV5ChromeClasses.constant";
import {
  shouldShowProjectEditOnMacHelperText,
  type ProjectEditOnMacCta,
} from "@/features/projects/utils/resolveProjectEditOnMacCta";

/**
 * HN-H3 header action: "Edit on this computer" when online on this computer;
 * "Connect this computer" (outline) while offline / unlinked — never a greyed
 * Edit that reads as broken.
 */
export default function AwcProjectHeaderEditAction({
  editCta,
}: {
  readonly editCta: ProjectEditOnMacCta;
}) {
  const reasonId = useId();
  const label = editCta.buttonLabel;
  if (editCta.href !== null) {
    return (
      <a
        href={editCta.href}
        target={editCta.state === "enabled" ? "_blank" : undefined}
        rel={editCta.state === "enabled" ? "noopener noreferrer" : undefined}
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
