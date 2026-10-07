"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  deleteComposerRecipientSticky,
  fetchComposerRecipientSticky,
  putComposerRecipientSticky,
} from "@/features/projects/messenger/oneWindow/fetchComposerRecipientSticky";
import {
  formatChipLabel,
  formatChipLabelMany,
  formatPlaceholderKept,
  formatPlaceholderSingle,
} from "@/features/projects/messenger/oneWindow/formatOneWindowComposerCopy";
import {
  keptToStickyPutBody,
  keptToStickySnapshot,
  stickySnapshotToKept,
} from "@/features/projects/messenger/oneWindow/mapStickyToKeptRecipient";
import { ONE_WINDOW_COMPOSER_COPY } from "@/features/projects/messenger/oneWindow/oneWindowComposerCopy.constant";
import { resolveOneWindowComposerMode } from "@/features/projects/messenger/oneWindow/resolveOneWindowComposerMode";
import type { MessengerKeptRecipient } from "@/features/projects/messenger/types/messengerChatStore.type";
import { messengerChatStoreIdb } from "@/features/projects/messenger/utils/messengerChatStoreIdb";
import { nextMessengerKeptRecipient } from "@/features/projects/messenger/utils/nextMessengerKeptRecipient";
import {
  readMessengerKeptRecipient,
  writeMessengerKeptRecipient,
} from "@/features/projects/messenger/utils/persistMessengerKeptRecipient";
import { decideComposerRecipientRouting } from "@/lib/projects/acl/composer/decideComposerRecipientRouting";

export type OneWindowRoutingAssistant = {
  readonly membershipId: string;
  readonly displayName: string;
};

export type UseOneWindowComposerRoutingInput = {
  readonly projectId: string;
  readonly memberKey: string | null;
  readonly assistants: readonly OneWindowRoutingAssistant[];
};

/** OW-H2 — composer routing chrome on existing sticky FSA + API + IDB cache. */
export const useOneWindowComposerRouting = (
  input: UseOneWindowComposerRoutingInput,
) => {
  const { projectId, memberKey, assistants } = input;
  const [kept, setKept] = useState<MessengerKeptRecipient | null>(null);
  const [picking, setPicking] = useState(false);
  const [draftForPicker, setDraftForPicker] = useState("");
  const [goneName, setGoneName] = useState<string | null>(null);
  const [singleName, setSingleName] = useState<string | null>(null);

  const assistantIds = useMemo(
    () => assistants.map((a) => a.membershipId),
    [assistants],
  );
  const nameById = useMemo(() => {
    const map = new Map<string, string>();
    for (const a of assistants) map.set(a.membershipId, a.displayName);
    return map;
  }, [assistants]);

  useEffect(() => {
    let cancelled = false;
    const load = async (): Promise<void> => {
      const server = await fetchComposerRecipientSticky(projectId);
      if (cancelled) return;
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
        if (memberKey !== null) {
          await writeMessengerKeptRecipient({
            store: messengerChatStoreIdb,
            projectId,
            memberKey,
            recipient: fromServer,
            now: Date.now(),
          });
        }
        return;
      }
      if (memberKey === null) return;
      const cached = await readMessengerKeptRecipient({
        store: messengerChatStoreIdb,
        projectId,
        memberKey,
      });
      if (!cancelled) setKept(cached);
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, [memberKey, nameById, projectId]);

  useEffect(() => {
    const next = nextMessengerKeptRecipient(kept, {
      type: "assistantsChanged",
      assistantMembershipIds: assistantIds,
    });
    if (next.goneMembershipIds.length > 0) {
      const id = next.goneMembershipIds[0];
      setGoneName(nameById.get(id) ?? "An assistant");
      setKept(null);
      if (memberKey !== null) {
        void writeMessengerKeptRecipient({
          store: messengerChatStoreIdb,
          projectId,
          memberKey,
          recipient: null,
          now: Date.now(),
        });
      }
      void deleteComposerRecipientSticky(projectId);
      return;
    }
    if (next.recipient !== kept && assistantIds.length <= 1) {
      setKept(null);
    }
  }, [assistantIds, kept, memberKey, nameById, projectId]);

  const modeInfo = resolveOneWindowComposerMode({
    assistantCount: assistants.length,
    kept,
    picking,
  });

  const placeholder = useMemo(() => {
    const C = ONE_WINDOW_COMPOSER_COPY;
    if (modeInfo.mode === "SINGLE") {
      const name =
        singleName ??
        assistants[0]?.displayName ??
        "assistant";
      return formatPlaceholderSingle(name);
    }
    if (modeInfo.mode === "KEPT" && kept !== null) {
      if (kept.kind === "everyone") return formatPlaceholderKept("everyone");
      const first = kept.membershipIds[0];
      const name = nameById.get(first) ?? "assistant";
      if (kept.membershipIds.length > 1) {
        return formatPlaceholderKept(
          `${name} and ${kept.membershipIds.length - 1} more`,
        );
      }
      return formatPlaceholderKept(name);
    }
    return C.placeholderEveryone;
  }, [assistants, kept, modeInfo.mode, nameById, singleName]);

  const chipLabel = useMemo(() => {
    if (kept === null) return null;
    if (kept.kind === "everyone") return ONE_WINDOW_COMPOSER_COPY.chipEveryone;
    const first = kept.membershipIds[0];
    const name = nameById.get(first) ?? "assistant";
    if (kept.membershipIds.length > 1) {
      return formatChipLabelMany(name, kept.membershipIds.length - 1);
    }
    return formatChipLabel(name);
  }, [kept, nameById]);

  const persistKept = useCallback(
    async (next: MessengerKeptRecipient | null) => {
      setKept(next);
      if (memberKey !== null) {
        await writeMessengerKeptRecipient({
          store: messengerChatStoreIdb,
          projectId,
          memberKey,
          recipient: next,
          now: Date.now(),
        });
      }
      if (next === null) {
        await deleteComposerRecipientSticky(projectId);
      } else {
        await putComposerRecipientSticky(projectId, keptToStickyPutBody(next));
      }
    },
    [memberKey, projectId],
  );

  const beginSendWithoutMention = useCallback(
    (text: string): "send" | "pick" => {
      if (modeInfo.hideAllRoutingUi) return "send";
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
    [assistants, kept, modeInfo.hideAllRoutingUi],
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
    [draftForPicker, kept, persistKept],
  );

  const cancelPicker = useCallback(() => {
    setPicking(false);
  }, []);

  const uncheckKeep = useCallback(async () => {
    const next = nextMessengerKeptRecipient(kept, { type: "uncheckChip" });
    await persistKept(next.recipient);
  }, [kept, persistKept]);

  return {
    mode: modeInfo.mode,
    picking: modeInfo.picking,
    hideAllRoutingUi: modeInfo.hideAllRoutingUi,
    placeholder,
    chipLabel,
    goneName,
    draftForPicker,
    beginSendWithoutMention,
    confirmPicker,
    cancelPicker,
    uncheckKeep,
    dismissGone: () => {
      setGoneName(null);
    },
  };
};
