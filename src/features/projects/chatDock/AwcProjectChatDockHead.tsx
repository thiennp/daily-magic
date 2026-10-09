"use client";

import AwcProjectChatDockAccessPill from "@/features/projects/chatDock/AwcProjectChatDockAccessPill";
import {
  CHAT_DOCK_HEAD_BTN_CLASS,
  CHAT_DOCK_HEAD_CLASS,
} from "@/features/projects/chatDock/projectChatDockClasses.constant";
import { PROJECT_CHAT_DOCK_COPY as C } from "@/features/projects/chatDock/projectChatDockCopy.constant";

interface AwcProjectChatDockHeadProps {
  readonly onClose: () => void;
  /** P1-S4a: owner's open join requests; the pill sits next to the title. */
  readonly accessPendingCount?: number;
  readonly onOpenAccess?: () => void;
}

/** Dock title ("Chat") + Minimise (back to the button). */
export default function AwcProjectChatDockHead({
  onClose,
  accessPendingCount = 0,
  onOpenAccess,
}: AwcProjectChatDockHeadProps) {
  const title = C["dock.titleFull"];
  return (
    <header className={CHAT_DOCK_HEAD_CLASS}>
      <span className="flex min-w-0 items-center gap-2.5">
        <h3 className="m-0 text-[15px] font-semibold text-white">{title}</h3>
        {onOpenAccess !== undefined ? (
          <AwcProjectChatDockAccessPill
            count={accessPendingCount}
            onOpen={onOpenAccess}
          />
        ) : null}
      </span>
      <span className="flex items-center gap-0.5">
        <button
          type="button"
          className={CHAT_DOCK_HEAD_BTN_CLASS}
          aria-label={C["dock.minimise"]}
          onClick={onClose}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
          </svg>
        </button>
      </span>
    </header>
  );
}
