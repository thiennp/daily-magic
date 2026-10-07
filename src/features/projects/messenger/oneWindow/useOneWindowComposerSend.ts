"use client";

import { useCallback } from "react";

import {
  parseOneWindowMentions,
  type OneWindowMentionAssistant,
} from "@/features/projects/messenger/oneWindow/oneWindowMentions";
import type { useOneWindowComposerRouting } from "@/features/projects/messenger/oneWindow/useOneWindowComposerRouting";
import type { MessengerTaskDraft } from "@/features/projects/messenger/utils/validateMessengerTaskDraft";

type Routing = ReturnType<typeof useOneWindowComposerRouting>;

export type OneWindowComposerSendInput = {
  readonly assistants: readonly OneWindowMentionAssistant[];
  readonly mentionsEnabled: boolean;
  readonly privateFeed: boolean;
  readonly routing?: Pick<Routing, "hideAllRoutingUi" | "beginSendWithoutMention">;
  readonly onSendMessage: (text: string, needsReply: boolean) => Promise<boolean>;
  readonly onSendTask: (draft: MessengerTaskDraft) => Promise<boolean>;
};

/**
 * P1-S4b send rules on the existing send paths (no new backend fields):
 * - each @assistant → one task (existing task dispatch, summary = the text)
 * - no @ on the whole feed → OW-H2 routing (picker / kept), then the message
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
  if (ids.length > 0) {
    for (const assigneeMembershipId of ids) {
      if (!(await input.onSendTask({ assigneeMembershipId, summary: text }))) return false;
    }
    return true;
  }
  const useRouting = !privateFeed && routing !== undefined && !routing.hideAllRoutingUi;
  if (useRouting && routing.beginSendWithoutMention(text) === "pick") return false;
  return input.onSendMessage(text, privateFeed);
};

export const useOneWindowComposerSend = (input: OneWindowComposerSendInput) => {
  const { assistants, mentionsEnabled, privateFeed, routing, onSendMessage, onSendTask } = input;
  return useCallback(
    (raw: string) =>
      sendOneWindowComposerText(
        { assistants, mentionsEnabled, privateFeed, routing, onSendMessage, onSendTask },
        raw,
      ),
    [assistants, mentionsEnabled, onSendMessage, onSendTask, privateFeed, routing],
  );
};
