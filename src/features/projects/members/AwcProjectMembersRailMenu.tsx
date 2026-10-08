"use client";

import { useState, type FocusEvent } from "react";

import { PROJECT_PAGE_MEMBERS_COPY as C } from "@/features/projects/projectPageMembersCopy.constant";

export interface RailMenuItem {
  readonly label: string;
  readonly run: () => void;
  readonly bad?: boolean;
  /** Draw a divider above this item. */
  readonly separated?: boolean;
}

const TRIGGER =
  "awc-focus-ring grid size-7 shrink-0 place-items-center rounded-lg text-[15px] font-semibold leading-none text-awc-fg-muted hover:bg-awc-fill";
const MENU =
  "absolute right-0 top-8 z-20 flex min-w-[13rem] flex-col rounded-[10px] border border-awc-line bg-awc-surface py-1 shadow-awc-card";
const ITEM =
  "awc-focus-ring px-3 py-1.5 text-left text-[13px] font-medium hover:bg-awc-fill";

/** Members rail header ⋯ menu (same pattern as the assistant row's more menu). */
export default function AwcProjectMembersRailMenu({
  items,
}: {
  readonly items: readonly RailMenuItem[];
}) {
  const [open, setOpen] = useState(false);
  const closeOnLeave = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null))
      setOpen(false);
  };
  return (
    <div
      className="relative ml-auto shrink-0"
      onBlur={closeOnLeave}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <button
        type="button"
        className={TRIGGER}
        aria-label={C.railMenuLabel}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        ⋯
      </button>
      {open ? (
        <div role="menu" aria-label={C.railMenuLabel} className={MENU}>
          {items.map((item) => (
            <div key={item.label} role="none" className="contents">
              {item.separated ? (
                <hr role="separator" className="my-1 border-awc-line" />
              ) : null}
              <button
                type="button"
                role="menuitem"
                className={`${ITEM} ${item.bad ? "text-awc-bad" : "text-awc-fg"}`}
                onClick={() => {
                  setOpen(false);
                  item.run();
                }}
              >
                {item.label}
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
