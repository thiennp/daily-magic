"use client";

import { CHAT_DOCK_VIEWER_CLASS } from "@/features/projects/chatDock/projectChatDockClasses.constant";
import { PROJECT_CHAT_DOCK_COPY as C } from "@/features/projects/chatDock/projectChatDockCopy.constant";

/** Visible viewer reason (not hover-only) when send is blocked. */
export default function AwcProjectChatDockViewerBanner() {
  return (
    <p role="status" className={`${CHAT_DOCK_VIEWER_CLASS} awc-disabled`}>
      {C["disabled.viewerMessage"]}
    </p>
  );
}
