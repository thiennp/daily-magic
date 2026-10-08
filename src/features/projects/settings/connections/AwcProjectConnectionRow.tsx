"use client";

import AwcProjectConnectionRowActions from "@/features/projects/settings/connections/AwcProjectConnectionRowActions";
import AwcProjectTaskSyncBlock from "@/features/projects/settings/connections/AwcProjectTaskSyncBlock";
import AwcProjectConnectionStatusPill from "@/features/projects/settings/connections/AwcProjectConnectionStatusPill";
import { formatConnectionConnectedOn } from "@/features/projects/settings/connections/formatConnectionConnectedOn";
import type { ProjectConnectionItem } from "@/features/projects/settings/connections/projectConnection.types";
import {
  PROJECT_CONNECTION_PROVIDER_DESCRIPTION,
  PROJECT_CONNECTION_PROVIDER_LABEL,
} from "@/features/projects/settings/connections/projectConnectionProviders.constant";
import {
  formatProjectConnectionsCopy,
  PROJECT_CONNECTIONS_COPY as C,
} from "@/features/projects/settings/connections/projectConnectionsCopy.constant";
import { resolveConnectionRowAction } from "@/features/projects/settings/connections/resolveConnectionRowAction";

interface AwcProjectConnectionRowProps {
  readonly item: ProjectConnectionItem;
  /** Owner sees action controls; members/viewers see "View only". */
  readonly isOwner: boolean;
  /** Owner + API ready — Connect / Reconnect / Disconnect light up. */
  readonly canMutate: boolean;
  readonly onConnect: (reconnect: boolean) => void;
  readonly onDisconnect: () => void;
  readonly projectId: string;
}

/** One provider row — service, status, account or description, owner action. */
export default function AwcProjectConnectionRow({
  item,
  isOwner,
  canMutate,
  onConnect,
  onDisconnect,
  projectId,
}: AwcProjectConnectionRowProps) {
  const name = PROJECT_CONNECTION_PROVIDER_LABEL[item.provider];
  const action = resolveConnectionRowAction(item.status);
  const needsAttention = item.status === "expired" || item.status === "error";
  const hint =
    item.status === "expired"
      ? C.reconnectHint
      : item.status === "error"
        ? C.attentionHint
        : null;

  return (
    <li
      className={`flex flex-wrap items-center gap-3 px-4 py-4 ${needsAttention ? "bg-awc-warn-soft/40" : ""}`}
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="text-sm font-semibold text-awc-fg dark:text-white/90">
            {name}
          </h4>
          <AwcProjectConnectionStatusPill status={item.status} />
        </div>
        {item.accountLabel !== null ? (
          <p className="mt-1 break-words text-[13px] text-awc-fg-muted dark:text-gray-300">
            <span className="font-semibold text-awc-fg dark:text-white/90">
              {item.accountLabel}
            </span>
            {item.connectedAt !== null
              ? ` · ${formatConnectionConnectedOn(item.connectedAt)}`
              : null}
          </p>
        ) : (
          <p className="mt-1 text-[13px] text-awc-fg-muted dark:text-gray-400">
            {PROJECT_CONNECTION_PROVIDER_DESCRIPTION[item.provider]}
          </p>
        )}
        {hint !== null ? (
          <p className="mt-1 text-[13px] font-medium text-awc-warn dark:text-warning-400">
            {formatProjectConnectionsCopy(hint, { service: name })}
          </p>
        ) : null}
      </div>
      {isOwner ? (
        <AwcProjectConnectionRowActions
          name={name}
          action={action}
          canMutate={canMutate}
          onConnect={onConnect}
          onDisconnect={onDisconnect}
        />
      ) : (
        <span className="text-[13px] font-medium text-awc-fg-muted dark:text-gray-400">
          {C.viewOnly}
        </span>
      )}
      {isOwner && item.provider === "linear" && item.status === "connected" ? (
        <AwcProjectTaskSyncBlock projectId={projectId} />
      ) : null}
    </li>
  );
}
