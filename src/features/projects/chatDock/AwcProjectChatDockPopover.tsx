"use client";

import type { ReactNode } from "react";

import AwcProjectChatDockHead from "@/features/projects/chatDock/AwcProjectChatDockHead";
import AwcProjectChatDockViewerBanner from "@/features/projects/chatDock/AwcProjectChatDockViewerBanner";
import {
  CHAT_DOCK_BODY_FULL_CLASS,
  CHAT_DOCK_COMPOSER_CLASS,
  CHAT_DOCK_POP_CLASS,
  CHAT_DOCK_POP_FULL_CLASS,
} from "@/features/projects/chatDock/projectChatDockClasses.constant";
import { PROJECT_CHAT_DOCK_COPY as C } from "@/features/projects/chatDock/projectChatDockCopy.constant";

interface AwcProjectChatDockPopoverProps {
  readonly full: boolean;
  readonly canSend: boolean;
  readonly onToggleFull: () => void;
  readonly onClose: () => void;
  readonly children: ReactNode;
}

/** Dock dialog shell: head, optional viewer banner, composer / full chat slot. */
export default function AwcProjectChatDockPopover({
  full,
  canSend,
  onToggleFull,
  onClose,
  children,
}: AwcProjectChatDockPopoverProps) {
  return (
    <section
      id="awc-chat-dock-pop"
      role="dialog"
      aria-label={full ? C["dock.titleFull"] : C["dock.title"]}
      className={full ? CHAT_DOCK_POP_FULL_CLASS : CHAT_DOCK_POP_CLASS}
    >
      <AwcProjectChatDockHead
        full={full}
        onToggleFull={onToggleFull}
        onClose={onClose}
      />
      {canSend || full ? null : <AwcProjectChatDockViewerBanner />}
      <div className={full ? CHAT_DOCK_BODY_FULL_CLASS : CHAT_DOCK_COMPOSER_CLASS}>
        {children}
      </div>
    </section>
  );
}
