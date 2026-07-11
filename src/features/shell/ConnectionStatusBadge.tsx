import Badge from "@/components/ui/badge/Badge";
import {
  CONNECTION_STATUS_DISPLAY,
  PAIRING_STATUS_DISPLAY,
  STATUS_BADGE_COLORS,
  type PairingStatusKey,
} from "@/features/shell/connectionStatusMapping.constant";
import type { WsTestConnectionStatus } from "@/features/wsTest/types/WsTestConnectionStatus.type";

interface ConnectionStatusBadgeProps {
  readonly status: WsTestConnectionStatus;
}

interface PairingStatusBadgeProps {
  readonly pairingStatus: PairingStatusKey;
}

export function ConnectionStatusBadge({ status }: ConnectionStatusBadgeProps) {
  const display = CONNECTION_STATUS_DISPLAY[status];

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
