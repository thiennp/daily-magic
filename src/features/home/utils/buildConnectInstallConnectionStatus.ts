import { MAC_WORKER_BENEFIT_COPY } from "@/lib/copy/macWorkerBenefitCopy.constant";

export type ConnectInstallConnectionTone =
  "waiting" | "connecting" | "success" | "error";

export interface ConnectInstallConnectionStatus {
  readonly message: string;
  readonly tone: ConnectInstallConnectionTone;
}

const CONNECT_INSTALL_CONNECTION_TONE_CLASS_NAME: Record<
  ConnectInstallConnectionTone,
  string
> = {
  waiting: "text-gray-600 dark:text-gray-400",
  connecting: "text-zinc-700 dark:text-zinc-300",
  success: "text-success-600 dark:text-success-500",
  error: "text-error-600 dark:text-error-500",
};

export const buildConnectInstallConnectionStatus = (input: {
  readonly installEngaged: boolean;
  readonly isInstallConnectionFinished: boolean;
}): ConnectInstallConnectionStatus | null => {
  if (input.installEngaged && input.isInstallConnectionFinished) {
    return { message: MAC_WORKER_BENEFIT_COPY.macConnected, tone: "success" };
  }

  if (input.installEngaged) {
    return { message: MAC_WORKER_BENEFIT_COPY.waitingForMac, tone: "waiting" };
  }

  return null;
};

export const buildConnectInstallConnectionStatusClassName = (
  tone: ConnectInstallConnectionTone,
): string => `mt-3 text-sm ${CONNECT_INSTALL_CONNECTION_TONE_CLASS_NAME[tone]}`;
