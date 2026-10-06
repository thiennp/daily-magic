"use client";

import AwcProjectChatDockMessageGlyph from "@/features/projects/chatDock/AwcProjectChatDockMessageGlyph";
import {
  CHAT_DOCK_BADGE_CLASS,
  CHAT_DOCK_FAB_CLASS,
} from "@/features/projects/chatDock/projectChatDockClasses.constant";
import { PROJECT_CHAT_DOCK_COPY as C } from "@/features/projects/chatDock/projectChatDockCopy.constant";

interface AwcProjectChatDockFabProps {
  readonly unreadCount: number;
  readonly expanded: boolean;
  readonly onToggle: () => void;
}

/** Floating New message control — aria only (no sticky tooltip over nav). */
export default function AwcProjectChatDockFab({
  unreadCount,
  expanded,
  onToggle,
}: AwcProjectChatDockFabProps) {
  const title = C["dock.title"];
  const aria =
    unreadCount > 0 ? `${title}, ${unreadCount} unread` : title;
  return (
    <button
      type="button"
      className={CHAT_DOCK_FAB_CLASS}
      aria-label={aria}
      aria-controls="awc-chat-dock-pop"
      aria-expanded={expanded}
      onClick={onToggle}
    >
      <AwcProjectChatDockMessageGlyph />
      {unreadCount > 0 ? (
        <b className={CHAT_DOCK_BADGE_CLASS} aria-hidden="true">
          {unreadCount}
        </b>
      ) : null}
    </button>
  );
}
