"use client";

import { useCallback } from "react";

import {
  parseOneWindowMentions,
  type OneWindowMentionAssistant,
} from "@/features/projects/messenger/oneWindow/oneWindowMentions";
import {
  type OneWindowKeptProgressRef,
  type OneWindowSendMessage,
  sendOneWindowMessageTo,
} from "@/features/projects/messenger/oneWindow/oneWindowSendTarget";
import type { useOneWindowComposerRouting } from "@/features/projects/messenger/oneWindow/useOneWindowComposerRouting";
import type { MessengerKeptRecipient } from "@/features/projects/messenger/types/messengerChatStore.type";
import type { MessengerTaskDraft } from "@/features/projects/messenger/utils/validateMessengerTaskDraft";

type Routing = ReturnType<typeof useOneWindowComposerRouting>;

export type OneWindowComposerSendInput = {
  readonly assistants: readonly OneWindowMentionAssistant[];
  readonly mentionsEnabled: boolean;
  readonly privateFeed: boolean;
  readonly routing?: Pick<
    Routing,
    "hideAllRoutingUi" | "beginSendWithoutMention"
  > & {
    readonly kept?: MessengerKeptRecipient | null;
  };
  readonly onSendMessage: OneWindowSendMessage;
  /** P1-S5b: per-draft kept-send tracking so a retry skips who already got it. */
  readonly keptProgress?: OneWindowKeptProgressRef;
  readonly onSendTask: (draft: MessengerTaskDraft) => Promise<boolean>;
  readonly onMentionError?: (error: string) => void;
};

/**
 * P1-S4b send rules on the existing send paths (no new backend fields):
 * - each @assistant → one task (existing task dispatch, summary = the text)
 * - no @ on the whole feed → OW-H2 routing: picker, or KEPT(r) → sent to r
 *   (P1-S5, COMPOSER-LOCK: each kept assistant's own thread; everyone → whole)
 * - no @ on an assistant's private feed → message to it, marked "needs a reply"
 * Resolves true when the draft can be cleared.
 */
export const sendOneWindowComposerText = async (
  input: OneWindowComposerSendInput,
  raw: string,
): Promise<boolean> => {
  const { assistants, mentionsEnabled, privateFeed, routing } = input;
  const text = raw.trim();
  if (text.length === 0) return false;
  const ids = mentionsEnabled ? parseOneWindowMentions(text, assistants) : [];
  if (ids.length > 1) {
    if (input.onMentionError)
      input.onMentionError("One assistant per message — @ only one.");
    return false;
  }
  if (ids.length === 1) {
    for (const assigneeMembershipId of ids) {
      if (!(await input.onSendTask({ assigneeMembershipId, summary: text })))
        return false;
    }
    return true;
  }
  const useRouting =
    !privateFeed && routing !== undefined && !routing.hideAllRoutingUi;
  if (useRouting) {
    if (routing.beginSendWithoutMention(text) === "pick") return false;
    const kept = routing.kept ?? null;
    if (kept !== null)
      return sendOneWindowMessageTo(
        input.onSendMessage,
        text,
        kept,
        input.keptProgress,
      );
  }
  return input.onSendMessage(text, privateFeed);
};

export const useOneWindowComposerSend = (input: OneWindowComposerSendInput) => {
  const {
    assistants,
    mentionsEnabled,
    privateFeed,
    routing,
    onSendMessage,
    onSendTask,
    keptProgress,
    onMentionError,
  } = input;
  return useCallback(
    (raw: string) =>
      sendOneWindowComposerText(
        {
          assistants,
          mentionsEnabled,
          privateFeed,
          routing,
          onSendMessage,
          onSendTask,
          keptProgress,
          onMentionError,
        },
        raw,
      ),
    [
      assistants,
      keptProgress,
      mentionsEnabled,
      onSendMessage,
      onSendTask,
      privateFeed,
      routing,
      onMentionError,
    ],
  );
};
