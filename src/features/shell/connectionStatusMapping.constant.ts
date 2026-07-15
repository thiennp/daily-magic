import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";
import { MAC_WORKER_BENEFIT_COPY } from "@/lib/copy/macWorkerBenefitCopy.constant";

export type StatusBadgeTone =
  "success" | "warning" | "error" | "neutral" | "info";

export interface StatusBadgeDisplay {
  readonly label: string;
  readonly tone: StatusBadgeTone;
}

export const CONNECTION_STATUS_DISPLAY: Record<
  WsTestConnectionStatus,
  StatusBadgeDisplay
> = {
  idle: { label: "Idle", tone: "neutral" },
  connecting: { label: "Reconnecting…", tone: "warning" },
  connected: { label: "Connected", tone: "success" },
  disconnected: { label: "Disconnected", tone: "neutral" },
  error: { label: "Connection error", tone: "error" },
};

export type PairingStatusKey =
  "not_connected" | "ready_to_pair" | "paired" | "pairing_failed";

export const PAIRING_STATUS_DISPLAY: Record<
  PairingStatusKey,
  StatusBadgeDisplay
> = {
  not_connected: { label: "No Mac ready yet", tone: "neutral" },
  ready_to_pair: { label: "Waiting for your Mac", tone: "warning" },
  paired: { label: "Mac ready", tone: "success" },
  pairing_failed: { label: MAC_WORKER_BENEFIT_COPY.setupFailed, tone: "error" },
};

export const STATUS_BADGE_COLORS: Record<
  StatusBadgeTone,
  "success" | "warning" | "error" | "light" | "info"
> = {
  success: "success",
  warning: "warning",
  error: "error",
  neutral: "light",
  info: "info",
};
