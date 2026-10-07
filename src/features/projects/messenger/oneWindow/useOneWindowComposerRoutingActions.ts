"use client";

import { useCallback } from "react";

import { keptToStickySnapshot } from "@/features/projects/messenger/oneWindow/mapStickyToKeptRecipient";
import {
  cacheOneWindowKeptRecipient,
  syncOneWindowKeptRecipientSticky,
} from "@/features/projects/messenger/oneWindow/persistOneWindowKeptRecipient";
import type { MessengerKeptRecipient } from "@/features/projects/messenger/types/messengerChatStore.type";
import { nextMessengerKeptRecipient } from "@/features/projects/messenger/utils/nextMessengerKeptRecipient";
import { decideComposerRecipientRouting } from "@/lib/projects/acl/composer/decideComposerRecipientRouting";

/** Composer routing actions: send-without-mention, picker confirm/cancel, uncheck keep. */
export const useOneWindowComposerRoutingActions = (input: {
  readonly projectId: string;
  readonly memberKey: string | null;
  readonly assistants: readonly { readonly membershipId: string }[];
  readonly kept: MessengerKeptRecipient | null;
  readonly hideAllRoutingUi: boolean;
  readonly draftForPicker: string;
  readonly setKept: (kept: MessengerKeptRecipient | null) => void;
  readonly setPicking: (picking: boolean) => void;
  readonly setDraftForPicker: (text: string) => void;
}) => {
  const { projectId, memberKey, assistants, kept, draftForPicker } = input;
  const { hideAllRoutingUi, setKept, setPicking, setDraftForPicker } = input;
  const persistKept = useCallback(
    async (next: MessengerKeptRecipient | null) => {
      setKept(next);
      await cacheOneWindowKeptRecipient({ projectId, memberKey, recipient: next });
      await syncOneWindowKeptRecipientSticky(projectId, next);
    },
    [memberKey, projectId, setKept],
  );

  const beginSendWithoutMention = useCallback(
    (text: string): "send" | "pick" => {
      if (hideAllRoutingUi) return "send";
      const decision = decideComposerRecipientRouting({
        mentionMembershipIds: [],
        stickyChecked: kept !== null,
        sticky: keptToStickySnapshot(kept),
        assistants: assistants.map((a) => ({ membershipId: a.membershipId })),
      });
      if (decision.kind === "require_popup" || decision.kind === "clear_sticky") {
        setDraftForPicker(text);
        setPicking(true);
        return "pick";
      }
      return "send";
    },
    [assistants, kept, hideAllRoutingUi, setDraftForPicker, setPicking],
  );

  const confirmPicker = useCallback(
    async (inputConfirm: {
      readonly recipient: MessengerKeptRecipient;
      readonly keepSending: boolean;
    }) => {
      const next = nextMessengerKeptRecipient(kept, {
        type: "confirm",
        recipient: inputConfirm.recipient,
        keepSending: inputConfirm.keepSending,
      });
      setPicking(false);
      await persistKept(next.recipient);
      return draftForPicker;
    },
    [draftForPicker, kept, persistKept, setPicking],
  );

  const cancelPicker = useCallback(() => {
    setPicking(false);
  }, [setPicking]);

  const uncheckKeep = useCallback(async () => {
    const next = nextMessengerKeptRecipient(kept, { type: "uncheckChip" });
    await persistKept(next.recipient);
  }, [kept, persistKept]);

  return { beginSendWithoutMention, confirmPicker, cancelPicker, uncheckKeep };
};
