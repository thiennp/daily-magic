"use client";

import { PROJECT_PAGE_LIBRARY_COPY as C } from "@/features/projects/library/projectPageLibraryCopy.constant";

/** Someone who cannot add items sees the reason only, not buttons they cannot press. */
export default function AwcProjectLibraryDisabledActions() {
  return (
    <span className="max-w-xs text-right text-xs text-awc-fg-muted dark:text-gray-400">
      {C["disabled.new"]}
    </span>
  );
}
