"use client";

import { useEffect } from "react";

import { fetchComposerRecipientSticky } from "@/features/projects/messenger/oneWindow/fetchComposerRecipientSticky";
import { stickySnapshotToKept } from "@/features/projects/messenger/oneWindow/mapStickyToKeptRecipient";
import { cacheOneWindowKeptRecipient } from "@/features/projects/messenger/oneWindow/persistOneWindowKeptRecipient";
import type { MessengerKeptRecipient } from "@/features/projects/messenger/types/messengerChatStore.type";
import { messengerChatStoreIdb } from "@/features/projects/messenger/utils/messengerChatStoreIdb";
import { readMessengerKeptRecipient } from "@/features/projects/messenger/utils/persistMessengerKeptRecipient";

/** Load kept recipient: server sticky first (cached to IDB), IDB when offline. */
export const useOneWindowKeptRecipientLoad = (input: {
  readonly projectId: string;
  readonly memberKey: string | null;
  readonly nameById: ReadonlyMap<string, string>;
  readonly setKept: (kept: MessengerKeptRecipient | null) => void;
  readonly setSingleName: (name: string | null) => void;
}): void => {
  const { projectId, memberKey, nameById, setKept, setSingleName } = input;
  useEffect(() => {
    const controller = new AbortController();
    const load = async (): Promise<void> => {
      const server = await fetchComposerRecipientSticky(projectId);
      if (controller.signal.aborted) return;
      if (server.ok) {
        if (server.singleAssistant !== null) {
          setSingleName(
            server.singleAssistant.displayName?.trim() ||
              nameById.get(server.singleAssistant.membershipId) ||
              "assistant",
          );
          setKept(null);
          return;
        }
        const fromServer = stickySnapshotToKept(server.sticky);
        setKept(fromServer);
        await cacheOneWindowKeptRecipient({ projectId, memberKey, recipient: fromServer });
        return;
      }
      if (memberKey === null) return;
      const cached = await readMessengerKeptRecipient({
        store: messengerChatStoreIdb,
        projectId,
        memberKey,
      });
      if (!controller.signal.aborted) setKept(cached);
    };
    void load();
    return () => controller.abort();
  }, [memberKey, nameById, projectId, setKept, setSingleName]);
};
