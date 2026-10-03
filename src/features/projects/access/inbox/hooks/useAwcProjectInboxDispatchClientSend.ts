"use client";

import { useState } from "react";

import { AWC_PROJECT_OWNER_MESSAGE_DISPLAY_NAME } from "@/features/projects/access/inbox/awcProjectMessageStatusCopy.constant";
import type AwcProjectInboxMessage from "@/features/projects/access/inbox/types/awcProjectInboxMessage.type";
import {
  resolveProjectMessageClientStatus,
  type ProjectMessageClientSendPhase,
} from "@/features/projects/access/inbox/utils/resolveProjectMessageClientStatus";

type ClientSend =
  | { readonly phase: "idle" }
  | {
      readonly phase: ProjectMessageClientSendPhase;
      readonly messageId: string;
    };

const acceptedMessageLanded = (
  clientSend: ClientSend,
  messages: readonly AwcProjectInboxMessage[],
): boolean =>
  clientSend.phase === "dispatch_accepted" &&
  clientSend.messageId.length > 0 &&
  messages.some((row) => row.messageId === clientSend.messageId);

export const useAwcProjectInboxDispatchClientSend = (
  messages: readonly AwcProjectInboxMessage[],
) => {
  const [clientSend, setClientSend] = useState<ClientSend>({ phase: "idle" });
  const visiblePhase = acceptedMessageLanded(clientSend, messages)
    ? "idle"
    : clientSend.phase;
  const statusText =
    visiblePhase === "idle"
      ? null
      : resolveProjectMessageClientStatus({
          phase: visiblePhase,
          senderDisplayName: AWC_PROJECT_OWNER_MESSAGE_DISPLAY_NAME,
        });

  return {
    statusText,
    isInFlight: visiblePhase === "in_flight",
    markInFlight: () => setClientSend({ phase: "in_flight", messageId: "" }),
    markAccepted: (messageId: string) =>
      setClientSend({ phase: "dispatch_accepted", messageId }),
    markIdle: () => setClientSend({ phase: "idle" }),
  };
};
