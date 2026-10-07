"use client";

import Button from "@/components/ui/button/Button";
import AwcProjectConnectionStatusPill from "@/features/projects/settings/connections/AwcProjectConnectionStatusPill";
import { formatConnectionConnectedOn } from "@/features/projects/settings/connections/formatConnectionConnectedOn";
import type { ProjectConnectionItem } from "@/features/projects/settings/connections/projectConnection.types";
import { PROJECT_CONNECTION_PROVIDER_LABEL } from "@/features/projects/settings/connections/projectConnectionProviders.constant";
import {
  formatProjectConnectionsCopy,
  PROJECT_CONNECTIONS_COPY as C,
} from "@/features/projects/settings/connections/projectConnectionsCopy.constant";
import { resolveConnectionRowAction } from "@/features/projects/settings/connections/resolveConnectionRowAction";

interface AwcProjectConnectionRowProps {
  readonly item: ProjectConnectionItem;
  /** Owner sees action controls; members/viewers see status only. */
  readonly isOwner: boolean;
  /** Owner + API ready — Disconnect lights up when connected. */
  readonly canMutate: boolean;
  readonly onDisconnect: () => void;
}

/** One provider row — service, status, account, owner action. */
export default function AwcProjectConnectionRow({
  item,
  isOwner,
  canMutate,
  onDisconnect,
}: AwcProjectConnectionRowProps) {
  const name = PROJECT_CONNECTION_PROVIDER_LABEL[item.provider];
  const action = resolveConnectionRowAction(item.status);
  const label =
    action === "disconnect"
      ? C.actionDisconnect
      : action === "reconnect"
        ? C.actionReconnect
        : C.actionConnect;
  // Connect / Reconnect stay disabled until OAuth start exists (UI-only).
  const enabled = canMutate && action === "disconnect";

  return (
    <li className="flex flex-wrap items-center gap-3 rounded-xl border border-awc-border/80 px-3 py-3 dark:border-gray-800/80">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-semibold text-awc-fg dark:text-white/90">
            {name}
          </p>
          <AwcProjectConnectionStatusPill status={item.status} />
        </div>
        {item.accountLabel !== null ? (
          <p className="mt-1 text-[13px] text-awc-fg-muted dark:text-gray-300">
            {item.accountLabel}
            {item.connectedAt !== null
              ? ` · ${formatConnectionConnectedOn(item.connectedAt)}`
              : null}
          </p>
        ) : null}
        {item.status === "expired" ? (
          <p className="mt-1 text-[13px] text-awc-warn dark:text-warning-400">
            {formatProjectConnectionsCopy(C.reconnectHint, { service: name })}
          </p>
        ) : null}
      </div>
      {isOwner ? (
        <Button
          size="sm"
          variant={action === "disconnect" ? "outline" : "primary"}
          disabled={!enabled}
          onClick={action === "disconnect" ? onDisconnect : undefined}
          className={
            action === "disconnect"
              ? "border-error-200 text-error-600 hover:bg-error-50 dark:border-error-900/40 dark:text-error-400"
              : undefined
          }
        >
          {label}
        </Button>
      ) : null}
    </li>
  );
}
