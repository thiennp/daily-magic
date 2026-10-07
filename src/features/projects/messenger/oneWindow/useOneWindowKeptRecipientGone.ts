"use client";

import { useEffect, useRef, useState } from "react";

import {
  cacheOneWindowKeptRecipient,
  syncOneWindowKeptRecipientSticky,
} from "@/features/projects/messenger/oneWindow/persistOneWindowKeptRecipient";
import type { MessengerKeptRecipient } from "@/features/projects/messenger/types/messengerChatStore.type";
import { nextMessengerKeptRecipient } from "@/features/projects/messenger/utils/nextMessengerKeptRecipient";

/**
 * Kept recipient vs current assistants: state is reconciled during render
 * (guarded: kept → null ends it); persistence runs in an effect per clear.
 */
export const useOneWindowKeptRecipientGone = (input: {
  readonly projectId: string;
  readonly memberKey: string | null;
  readonly kept: MessengerKeptRecipient | null;
  readonly assistantIds: readonly string[];
  readonly nameById: ReadonlyMap<string, string>;
  readonly setKept: (kept: MessengerKeptRecipient | null) => void;
  readonly setGoneName: (name: string | null) => void;
}): void => {
  const { projectId, memberKey, kept, assistantIds, nameById } = input;
  const [goneClearSeq, setGoneClearSeq] = useState(0);
  const goneClearDone = useRef(0);
  const reconciled = nextMessengerKeptRecipient(kept, {
    type: "assistantsChanged",
    assistantMembershipIds: assistantIds,
  });
  if (reconciled.goneMembershipIds.length > 0) {
    const id = reconciled.goneMembershipIds[0];
    input.setGoneName(nameById.get(id) ?? "An assistant");
    input.setKept(null);
    setGoneClearSeq((n) => n + 1);
  } else if (reconciled.recipient !== kept && assistantIds.length <= 1) {
    input.setKept(null);
  }

  useEffect(() => {
    if (goneClearSeq === goneClearDone.current) return;
    goneClearDone.current = goneClearSeq;
    void cacheOneWindowKeptRecipient({ projectId, memberKey, recipient: null });
    void syncOneWindowKeptRecipientSticky(projectId, null);
  }, [goneClearSeq, memberKey, projectId]);
};
