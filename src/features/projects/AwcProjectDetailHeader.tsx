"use client";

import { useEffect, useId, useRef, useState } from "react";

import AwcProjectEditOnMacActions from "@/features/projects/AwcProjectEditOnMacActions";
import AwcProjectPathDisplay from "@/features/projects/AwcProjectPathDisplay";
import { PROJECT_PAGE_LAYOUT_V2_COPY } from "@/features/projects/projectPageLayoutV2Copy.constant";
import type { ProjectDevicePresenceLabel } from "@/features/projects/utils/buildProjectDevicePresenceLabel";
import type { ProjectEditOnMacCta } from "@/features/projects/utils/resolveProjectEditOnMacCta";

interface AwcProjectDetailHeaderProps {
  readonly projectName: string;
  readonly folderPath: string;
  readonly presence: ProjectDevicePresenceLabel;
  readonly deviceDisplayName: string;
  readonly editCta: ProjectEditOnMacCta;
  readonly canRename: boolean;
  readonly onRename: () => void;
  readonly onInvite: () => void;
  readonly onDelete: () => void;
}

const DOT_BY_STATUS: Record<
  ProjectDevicePresenceLabel["statusIcon"],
  string
> = {
  online: "bg-success-500",
  offline: "bg-gray-300 dark:bg-gray-600",
  reconnecting: "bg-warning-500",
};

function statusHeadline(
  presence: ProjectDevicePresenceLabel,
  copy: typeof PROJECT_PAGE_LAYOUT_V2_COPY,
): string {
  if (presence.statusIcon === "reconnecting") {
    return copy.statusReconnecting;
  }
  if (presence.statusIcon === "offline") {
    return copy.statusOffline;
  }
  return copy.statusAllGood;
}

function statusOnlineClause(
  presence: ProjectDevicePresenceLabel,
  deviceDisplayName: string,
  copy: typeof PROJECT_PAGE_LAYOUT_V2_COPY,
): string {
  const device = deviceDisplayName.trim() || "Mac";
  if (presence.statusIcon === "offline") {
    return copy.offlineOn(device);
  }
  return copy.onlineOn(device);
}

export default function AwcProjectDetailHeader({
  projectName,
  folderPath,
  presence,
  deviceDisplayName,
  editCta,
  canRename,
  onRename,
  onInvite,
  onDelete,
}: AwcProjectDetailHeaderProps) {
  const copy = PROJECT_PAGE_LAYOUT_V2_COPY;
  const menuId = useId();
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const onKey = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };
    const onPointer = (event: MouseEvent): void => {
      if (
        wrapRef.current !== null &&
        !wrapRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onPointer);
    };
  }, [menuOpen]);

  const editCtaEn = { ...editCta, buttonLabel: copy.editOnThisComputer };

  return (
    <header className="flex min-w-0 flex-col gap-4">
      <div className="relative flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-2">
          <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-bold tracking-[-0.03em] text-gray-900 dark:text-white">
            {projectName}
          </h1>
          <p
            role="status"
            className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500 dark:text-gray-400"
          >
            <span
              aria-hidden="true"
              className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${DOT_BY_STATUS[presence.statusIcon]}`}
            />
            <span className="text-gray-700 dark:text-gray-200">
              {statusHeadline(presence, copy)}
            </span>
            <span aria-hidden="true">·</span>
            <span>{statusOnlineClause(presence, deviceDisplayName, copy)}</span>
            <span aria-hidden="true">·</span>
            <span className="min-w-0 max-w-[min(30ch,50vw)] overflow-hidden">
              <AwcProjectPathDisplay folderPath={folderPath} />
            </span>
          </p>
        </div>

        <div ref={wrapRef} className="relative flex shrink-0 items-center gap-2">
          <AwcProjectEditOnMacActions
            editCta={editCtaEn}
            size="compact"
            layout="buttonOnly"
            fullWidthOnMobile
          />
          <button
            type="button"
            className="inline-grid size-8 place-items-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400/40 dark:bg-white/10 dark:text-gray-300 dark:hover:bg-white/15 dark:focus-visible:ring-gray-500/40"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={copy.moreOptions}
            onClick={() => {
              setMenuOpen((open) => !open);
            }}
          >
            <svg width="16" height="4" viewBox="0 0 18 4" fill="currentColor" aria-hidden>
              <circle cx="2" cy="2" r="2" />
              <circle cx="9" cy="2" r="2" />
              <circle cx="16" cy="2" r="2" />
            </svg>
          </button>
          {menuOpen ? (
            <div
              id={menuId}
              role="menu"
              className="absolute right-0 top-10 z-20 flex min-w-[14.5rem] flex-col rounded-[14px] border border-gray-200/90 bg-white p-1.5 shadow-lg dark:border-gray-700 dark:bg-gray-950"
            >
              {canRename ? (
                <button
                  type="button"
                  role="menuitem"
                  className="rounded-lg px-3 py-2 text-left text-sm text-gray-800 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-400/40 dark:text-gray-100 dark:hover:bg-white/10"
                  onClick={() => {
                    setMenuOpen(false);
                    onRename();
                  }}
                >
                  {copy.menuRename}
                </button>
              ) : null}
              <button
                type="button"
                role="menuitem"
                className="rounded-lg px-3 py-2 text-left text-sm text-gray-800 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-400/40 dark:text-gray-100 dark:hover:bg-white/10"
                onClick={() => {
                  setMenuOpen(false);
                  onInvite();
                }}
              >
                {copy.menuInvite}
              </button>
              <div
                className="my-1 border-t border-gray-200 dark:border-gray-800"
                role="separator"
              />
              <button
                type="button"
                role="menuitem"
                className="rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-400/40 dark:text-red-400 dark:hover:bg-red-950/40"
                onClick={() => {
                  setMenuOpen(false);
                  onDelete();
                }}
              >
                {copy.menuDelete}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
