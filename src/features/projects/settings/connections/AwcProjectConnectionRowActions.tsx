"use client";

import {
  CONNECTION_BTN,
  CONNECTION_BTN_DANGER,
  CONNECTION_BTN_PRIMARY,
} from "@/features/projects/settings/connections/projectConnectionClasses.constant";
import { PROJECT_CONNECTIONS_COPY as C } from "@/features/projects/settings/connections/projectConnectionsCopy.constant";
import type { ConnectionRowActionKind } from "@/features/projects/settings/connections/resolveConnectionRowAction";

interface AwcProjectConnectionRowActionsProps {
  readonly name: string;
  readonly action: ConnectionRowActionKind;
  readonly canMutate: boolean;
  readonly onConnect: (reconnect: boolean) => void;
  readonly onDisconnect: () => void;
}

/** Owner actions: Connect · Reconnect (+ Disconnect) · Disconnect. */
export default function AwcProjectConnectionRowActions({
  name,
  action,
  canMutate,
  onConnect,
  onDisconnect,
}: AwcProjectConnectionRowActionsProps) {
  const disconnect = (
    <button
      type="button"
      disabled={!canMutate}
      aria-label={`${C.actionDisconnect} ${name}`}
      className={
        action === "disconnect" ? CONNECTION_BTN_DANGER : CONNECTION_BTN
      }
      onClick={onDisconnect}
    >
      {C.actionDisconnect}
    </button>
  );
  if (action === "disconnect") {
    return <div className="flex gap-2">{disconnect}</div>;
  }
  const reconnect = action === "reconnect";
  return (
    <div className="flex flex-wrap justify-end gap-2">
      {reconnect ? disconnect : null}
      <button
        type="button"
        disabled={!canMutate}
        aria-label={`${reconnect ? C.actionReconnect : C.actionConnect} ${name}`}
        className={CONNECTION_BTN_PRIMARY}
        onClick={() => onConnect(reconnect)}
      >
        {reconnect ? C.actionReconnect : C.actionConnect}
      </button>
    </div>
  );
}
