"use client";

import { useId } from "react";

import { AWC_PROJECT_PITFALLS_COPY as C } from "@/features/projects/pitfalls/awcProjectPitfallsCopy.constant";
import type { ProjectEditOnMacCta } from "@/features/projects/utils/public-api/types";
import { resolveProjectEditOnMacLinkProps } from "@/features/projects/utils/public-api/presentation";

const LINK_CLASS =
  "font-medium text-awc-fg underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400/40 dark:text-white";

/** Deep link into AgentWitch Local Pitfalls — artifact note-line link. */
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
        {...resolveProjectEditOnMacLinkProps(editCta.href)}
        className={LINK_CLASS}
      >
        {C.manageOnThisComputer}
      </a>
    );
  }
  return (
    <span className="inline-flex flex-col items-start gap-0.5">
      <button
        type="button"
        disabled
        aria-describedby={editCta.helperText !== null ? helperId : undefined}
        className={`${LINK_CLASS} cursor-not-allowed opacity-50`}
      >
        {C.manageOnThisComputer}
      </button>
      {editCta.helperText !== null ? (
        <span
          id={helperId}
          className="max-w-xs text-xs text-awc-fg-muted dark:text-gray-400"
        >
          {editCta.helperText}
        </span>
      ) : null}
    </span>
  );
}
