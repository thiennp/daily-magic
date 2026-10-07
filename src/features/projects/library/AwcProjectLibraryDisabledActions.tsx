"use client";

import { useId } from "react";

import { PROJECT_PAGE_LIBRARY_ACTIONS_COPY as A } from "@/features/projects/library/projectPageLibraryActionsCopy.constant";
import { PROJECT_PAGE_LIBRARY_COPY as C } from "@/features/projects/library/projectPageLibraryCopy.constant";
import {
  PANEL_BUTTON_PRIMARY_CLASS,
  PANEL_BUTTON_SECONDARY_CLASS,
} from "@/features/projects/projectPagePanelChrome.constant";

/** New + Add from disabled with visible owner-only reason. */
export default function AwcProjectLibraryDisabledActions() {
  const reasonId = useId();
  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled
          aria-describedby={reasonId}
          className={`${PANEL_BUTTON_PRIMARY_CLASS} cursor-not-allowed`}
        >
          {A["library.new"]}
        </button>
        <button
          type="button"
          disabled
          aria-describedby={reasonId}
          className={`${PANEL_BUTTON_SECONDARY_CLASS} cursor-not-allowed`}
        >
          {A["library.add_from"]}
        </button>
      </div>
      <span
        id={reasonId}
        className="max-w-xs text-xs text-awc-fg-muted dark:text-gray-400"
      >
        {C["disabled.new"]}
      </span>
    </div>
  );
}
