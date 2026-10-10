"use client";

import Badge from "@/components/ui/badge/Badge";
import {
  CONNECTION_STATUS_DISPLAY,
  PAIRING_STATUS_DISPLAY,
  STATUS_BADGE_COLORS,
  type PairingStatusKey,
} from "@/features/shell/connectionStatusMapping.constant";
import { useConnectingGraceElapsed } from "@/features/shell/useConnectingGrace";
import type { WsTestConnectionStatus } from "@/features/agent/types/public-api/types";

interface ConnectionStatusBadgeProps {
  readonly status: WsTestConnectionStatus;
}

interface PairingStatusBadgeProps {
  readonly pairingStatus: PairingStatusKey;
}

export function ConnectionStatusBadge({ status }: ConnectionStatusBadgeProps) {
  const display = CONNECTION_STATUS_DISPLAY[status];
  const visible = useConnectingGraceElapsed(status);
  if (!visible) return null;

  return (
    <Badge color={STATUS_BADGE_COLORS[display.tone]} size="sm">
      {display.label}
    </Badge>
  );
}

export function PairingStatusBadge({ pairingStatus }: PairingStatusBadgeProps) {
  const display = PAIRING_STATUS_DISPLAY[pairingStatus];

  return (
    <Badge color={STATUS_BADGE_COLORS[display.tone]} size="sm">
      {display.label}
    </Badge>
  );
}
