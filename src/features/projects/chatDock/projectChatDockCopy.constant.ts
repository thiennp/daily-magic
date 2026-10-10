import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/public-api/types";
import { PROJECT_ASK_BOX_COPY } from "@/features/projects/askBox/public-api/types";

/**
 * L3 V5-4 Chat dock — Product EN lock (PLAN §5.2 + Product steer 2026-10-06).
 * Locked strings only; do not invent empty-state copy.
 */
export const PROJECT_CHAT_DOCK_COPY = {
  "dock.title": "New message",
  /** P1-S3 (AW Lead): full-view header; the composer lock keeps "New message" compact only. */
  "dock.titleFull": "Chat",
  "dock.minimise": "Minimise",
  "dock.sendTo.allAssistants": "All assistants",
  "dock.task.oneRecipient":
    "A task needs one recipient. Pick one assistant or This computer.",
  "disabled.viewerMessage": HUMAN_INVITE_UI_COPY.viewerMessagesHint,
  sendTo: PROJECT_ASK_BOX_COPY.sendTo,
} as const;
