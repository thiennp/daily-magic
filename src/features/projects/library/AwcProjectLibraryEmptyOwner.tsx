"use client";

import { PROJECT_PAGE_LIBRARY_ACTIONS_COPY as A } from "@/features/projects/library/projectPageLibraryActionsCopy.constant";
import { PROJECT_PAGE_LIBRARY_COPY as C } from "@/features/projects/library/projectPageLibraryCopy.constant";
import {
  PANEL_BUTTON_PRIMARY_CLASS,
  PANEL_BUTTON_SECONDARY_CLASS,
} from "@/features/projects/projectPagePanelChrome.constant";

const LIB_ICON = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H10v16H5.5A1.5 1.5 0 0 1 4 18.5z" />
    <path d="M14 4h4.5A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5H14z" />
  </svg>
);

interface AwcProjectLibraryEmptyOwnerProps {
  readonly onNew?: () => void;
  readonly onAddFrom?: () => void;
}

/** HN-H3 empty card with New (primary) + Add from (secondary). */
export default function AwcProjectLibraryEmptyOwner({
  onNew,
  onAddFrom,
}: AwcProjectLibraryEmptyOwnerProps) {
  return (
    <div className="rounded-[14px] border border-dashed border-awc-border-strong bg-awc-tile px-6 py-10 text-center dark:border-gray-700 dark:bg-white/[0.03]">
      <div className="mx-auto mb-3 grid size-11 place-items-center rounded-xl bg-awc-accent-soft text-brand-600 dark:bg-white/10 dark:text-brand-400">
        {LIB_ICON}
      </div>
      <h2 className="text-[17px] font-semibold text-awc-fg dark:text-white">
        {C["library.empty.owner.title"]}
      </h2>
      <p className="mx-auto mt-1 max-w-[380px] text-sm text-awc-fg-muted dark:text-gray-400">
        {C["library.empty.owner.body"]}
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          className={PANEL_BUTTON_PRIMARY_CLASS}
          onClick={onNew}
        >
          {A["library.new"]}
        </button>
        <button
          type="button"
          className={PANEL_BUTTON_SECONDARY_CLASS}
          onClick={onAddFrom}
        >
          {A["library.add_from"]}
        </button>
      </div>
    </div>
  );
}
