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
  const [selected, setSelected] = useState<string | null>(null);
  const [keep, setKeep] = useState(false);

  const keepLab = keepCheckboxLabel();
  const canSend = selected !== null;

  const subtitle = useMemo(
    () =>
      `${input.assistantsCount} assistants${input.peopleCount > 0 ? `, ${input.peopleCount} people` : ""}`,
    [input.assistantsCount, input.peopleCount],
  );

  const confirm = (): void => {
    if (!canSend) return;
    const recipient: MessengerKeptRecipient = {
      kind: "assistant",
      membershipId: selected,
    };
    input.onConfirm({ recipient, keepSending: keep });
  };

  return {
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
