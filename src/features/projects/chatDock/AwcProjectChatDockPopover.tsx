"use client";

import type { ReactNode } from "react";

import AwcProjectChatDockHead from "@/features/projects/chatDock/AwcProjectChatDockHead";
import {
  CHAT_DOCK_BODY_FULL_CLASS,
  CHAT_DOCK_POP_FULL_CLASS,
} from "@/features/projects/chatDock/projectChatDockClasses.constant";
import { PROJECT_CHAT_DOCK_COPY as C } from "@/features/projects/chatDock/projectChatDockCopy.constant";

interface AwcProjectChatDockPopoverProps {
  readonly onClose: () => void;
  readonly children: ReactNode;
  readonly accessPendingCount?: number;
  readonly onOpenAccess?: () => void;
}

/** Dock dialog shell (maximal view): head + the full chat. */
export default function AwcProjectChatDockPopover({
  onClose,
  children,
  accessPendingCount,
  onOpenAccess,
}: AwcProjectChatDockPopoverProps) {
  return (
    <section
      id="awc-chat-dock-pop"
      role="dialog"
      aria-label={C["dock.titleFull"]}
      className={CHAT_DOCK_POP_FULL_CLASS}
    >
      <AwcProjectChatDockHead
        onClose={onClose}
        accessPendingCount={accessPendingCount}
        onOpenAccess={onOpenAccess}
      />
      <div className={CHAT_DOCK_BODY_FULL_CLASS}>{children}</div>
    </section>
  );
}
