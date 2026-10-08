import { useMemo, useState } from "react";

import { keepCheckboxLabel } from "@/features/projects/messenger/oneWindow/formatOneWindowComposerCopy";
import type { MessengerKeptRecipient } from "@/features/projects/messenger/types/messengerChatStore.type";

export const useOneWindowComposerPickerState = (input: {
  readonly assistantsCount: number;
  readonly peopleCount: number;
  readonly onConfirm: (input: {
    readonly recipient: MessengerKeptRecipient;
    readonly keepSending: boolean;
  }) => void;
}) => {
  const [everyone, setEveryone] = useState(false);
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [keep, setKeep] = useState(false);

  const selectedCount = everyone ? 1 : selected.length;
  const keepLab = keepCheckboxLabel({ everyone, selectedCount });
  const canSend = everyone || selected.length > 0;

  const subtitle = useMemo(
    () =>
      `${input.assistantsCount} assistants${input.peopleCount > 0 ? `, ${input.peopleCount} people` : ""}`,
    [input.assistantsCount, input.peopleCount],
  );

  const confirm = (): void => {
    if (!canSend) return;
    const recipient: MessengerKeptRecipient = everyone
      ? { kind: "everyone" }
      : { kind: "assistants", membershipIds: selected };
    input.onConfirm({ recipient, keepSending: keep });
  };

  return {
    everyone,
    setEveryone,
    selected,
    setSelected,
    keep,
    setKeep,
    keepLab,
    canSend,
    subtitle,
    confirm,
  };
};
