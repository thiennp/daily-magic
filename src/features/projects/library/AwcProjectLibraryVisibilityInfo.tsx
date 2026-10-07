"use client";

import { useId } from "react";

import { PROJECT_PAGE_LIBRARY_COPY as C } from "@/features/projects/library/projectPageLibraryCopy.constant";

/** HN-H3 design: "drafts are only visible to you" note as an (i) tooltip in the toolbar. */
export default function AwcProjectLibraryVisibilityInfo() {
  const tipId = useId();
  return (
    <span className="group relative inline-flex">
      <button
        type="button"
        className="awc-focus-ring grid size-[18px] cursor-help place-items-center rounded-full border border-awc-border-strong bg-transparent p-0 text-[11px] font-semibold leading-none text-awc-fg-muted"
        aria-label={C["library.visibilityInfoLabel"]}
        aria-describedby={tipId}
      >
        i
      </button>
      <span
        role="tooltip"
        id={tipId}
        className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-10 w-max max-w-[240px] -translate-x-1/2 rounded-lg bg-awc-fg px-2.5 py-2 text-[12.5px] leading-snug text-white opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"
      >
        {C["library.visibilityHint"]}
      </span>
    </span>
  );
}
