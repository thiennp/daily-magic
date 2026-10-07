"use client";

import {
  CHAT_DOCK_HEAD_BTN_CLASS,
  CHAT_DOCK_HEAD_CLASS,
} from "@/features/projects/chatDock/projectChatDockClasses.constant";
import { PROJECT_CHAT_DOCK_COPY as C } from "@/features/projects/chatDock/projectChatDockCopy.constant";

interface AwcProjectChatDockHeadProps {
  readonly full: boolean;
  readonly onToggleFull: () => void;
  readonly onClose: () => void;
}

/** Dock title ("Chat" in full view, "New message" compact) + Full screen / Exit full screen + Minimise. */
export default function AwcProjectChatDockHead({
  full,
  onToggleFull,
  onClose,
}: AwcProjectChatDockHeadProps) {
  const sizeLabel = full ? C["dock.exitFull"] : C["dock.expand"];
  const title = full ? C["dock.titleFull"] : C["dock.title"];
  return (
    <header className={CHAT_DOCK_HEAD_CLASS}>
      <h3 className="m-0 text-[15px] font-semibold text-white">{title}</h3>
      <span className="flex items-center gap-0.5">
        <button
          type="button"
          className={CHAT_DOCK_HEAD_BTN_CLASS}
          aria-label={sizeLabel}
          onClick={onToggleFull}
        >
          {full ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          )}
        </button>
        <button
          type="button"
          className={CHAT_DOCK_HEAD_BTN_CLASS}
          aria-label={C["dock.minimise"]}
          onClick={onClose}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
          </svg>
        </button>
      </span>
    </header>
  );
}
