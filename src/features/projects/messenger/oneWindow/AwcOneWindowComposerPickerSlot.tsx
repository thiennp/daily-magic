"use client";

import AwcOneWindowComposerPicker, {
  type OneWindowPickerAssistant,
} from "@/features/projects/messenger/oneWindow/AwcOneWindowComposerPicker";
import {
  type OneWindowKeptProgressRef,
  type OneWindowSendMessage,
  sendOneWindowMessageTo,
} from "@/features/projects/messenger/oneWindow/oneWindowSendTarget";
import type { AwcMessengerComposerRouting } from "@/features/projects/messenger/types/awcMessengerComposerProps.type";

interface AwcOneWindowComposerPickerSlotProps {
  readonly routing: AwcMessengerComposerRouting | undefined;
  readonly assistants: readonly OneWindowPickerAssistant[];
  readonly onSendMessage: OneWindowSendMessage;
  readonly keptProgress: OneWindowKeptProgressRef;
  readonly onSent: (ok: boolean) => void;
}

/** OW-H2 picker: confirm sends to the ONE chosen assistant (093103ac). */
export default function AwcOneWindowComposerPickerSlot(
  p: AwcOneWindowComposerPickerSlotProps,
) {
  const routing = p.routing;
  if (!routing?.picking) return null;
  return (
    <AwcOneWindowComposerPicker
      draftText={routing.draftForPicker}
      assistants={p.assistants}
      onCancel={routing.cancelPicker}
      onConfirm={(choice) => {
        void routing
          .confirmPicker(choice)
          .then((text) =>
            sendOneWindowMessageTo(
              p.onSendMessage,
              text,
              choice.recipient,
              p.keptProgress,
            ),
          )
          .then(p.onSent);
      }}
    />
  );
}
