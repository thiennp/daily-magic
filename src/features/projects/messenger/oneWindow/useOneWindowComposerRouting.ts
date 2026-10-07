"use client";

import { useMemo, useState } from "react";

import {
  formatOneWindowRoutingChipLabel,
  formatOneWindowRoutingPlaceholder,
} from "@/features/projects/messenger/oneWindow/oneWindowComposerRoutingLabels";
import { resolveOneWindowComposerMode } from "@/features/projects/messenger/oneWindow/resolveOneWindowComposerMode";
import { useOneWindowComposerRoutingActions } from "@/features/projects/messenger/oneWindow/useOneWindowComposerRoutingActions";
import { useOneWindowKeptRecipientGone } from "@/features/projects/messenger/oneWindow/useOneWindowKeptRecipientGone";
import { useOneWindowKeptRecipientLoad } from "@/features/projects/messenger/oneWindow/useOneWindowKeptRecipientLoad";
import type { MessengerKeptRecipient } from "@/features/projects/messenger/types/messengerChatStore.type";

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

  useOneWindowKeptRecipientLoad({ projectId, memberKey, nameById, setKept, setSingleName });
  useOneWindowKeptRecipientGone({
    projectId,
    memberKey,
    kept,
    assistantIds,
    nameById,
    setKept,
    setGoneName,
  });

  const modeInfo = resolveOneWindowComposerMode({
    assistantCount: assistants.length,
    kept,
    picking,
  });

  const placeholder = useMemo(
    () =>
      formatOneWindowRoutingPlaceholder({
        mode: modeInfo.mode,
        kept,
        singleName,
        firstAssistantName: assistants[0]?.displayName,
        nameById,
      }),
    [assistants, kept, modeInfo.mode, nameById, singleName],
  );
  const chipLabel = useMemo(
    () => formatOneWindowRoutingChipLabel(kept, nameById),
    [kept, nameById],
  );
  const actions = useOneWindowComposerRoutingActions({
    projectId,
    memberKey,
    assistants,
    kept,
    hideAllRoutingUi: modeInfo.hideAllRoutingUi,
    draftForPicker,
    setKept,
    setPicking,
    setDraftForPicker,
  });

  return {
    mode: modeInfo.mode,
    picking: modeInfo.picking,
    hideAllRoutingUi: modeInfo.hideAllRoutingUi,
    placeholder,
    chipLabel,
    goneName,
    draftForPicker,
    ...actions,
    dismissGone: () => {
      setGoneName(null);
    },
  };
};
