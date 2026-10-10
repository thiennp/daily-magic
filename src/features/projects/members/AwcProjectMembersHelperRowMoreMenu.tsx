"use client";

import { useState, type FocusEvent } from "react";

import { PROJECT_PAGE_MEMBERS_COPY as C } from "@/features/projects/public-api/types";

interface AwcProjectMembersHelperRowMoreMenuProps {
  readonly name: string;
  readonly onMessage: () => void;
  readonly onRename: () => void;
  readonly onWakeLink: () => void;
  readonly onRemove: () => void;
}

const TRIGGER =
  "awc-focus-ring grid size-7 shrink-0 place-items-center rounded-lg text-[15px] font-semibold leading-none text-awc-fg-muted hover:bg-awc-fill";
const MENU =
  "absolute right-0 top-8 z-20 flex min-w-[11rem] flex-col rounded-[10px] border border-awc-line bg-awc-surface py-1 shadow-awc-card";
const ITEM =
  "awc-focus-ring px-3 py-1.5 text-left text-[13px] font-medium hover:bg-awc-fill";

/** DF-036 F12: the assistant row's ⋯ menu — Message privately · Rename · Wake link · Remove. */
export default function AwcProjectMembersHelperRowMoreMenu(
  p: AwcProjectMembersHelperRowMoreMenuProps,
) {
  const [open, setOpen] = useState(false);
  const pick = (run: () => void) => () => {
    setOpen(false);
    run();
  };
  const closeOnLeave = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null))
      setOpen(false);
  };
  const items = [
    { label: C.menuChat, run: p.onMessage, bad: false },
    { label: C.menuRename, run: p.onRename, bad: false },
    { label: C.menuWebhook, run: p.onWakeLink, bad: false },
    { label: C.menuRemove, run: p.onRemove, bad: true },
  ];
  return (
    <div
      className="relative shrink-0"
      onBlur={closeOnLeave}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <button
        type="button"
        className={TRIGGER}
        aria-label={`More for ${p.name}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        ⋯
      </button>
      {open ? (
        <div role="menu" aria-label={`More for ${p.name}`} className={MENU}>
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              className={`${ITEM} ${item.bad ? "text-awc-bad" : "text-awc-fg"}`}
              onClick={pick(item.run)}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
