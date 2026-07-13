export type ConnectInstallConnectionTone = "waiting" | "connecting" | "error";

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
  error: "text-error-600 dark:text-error-500",
};

export const buildConnectInstallConnectionStatus = (input: {
  readonly installEngaged: boolean;
  readonly isLinking: boolean;
  readonly linkError: string | null;
}): ConnectInstallConnectionStatus | null => {
  if (
    input.installEngaged &&
    input.linkError !== null &&
    input.linkError.length > 0
  ) {
    return { message: input.linkError, tone: "error" };
  }

  if (input.installEngaged && input.isLinking) {
    return { message: "Connecting to your Mac…", tone: "connecting" };
  }

  if (input.installEngaged) {
    return { message: "Waiting for your Mac to connect…", tone: "waiting" };
  }

  return null;
};

export const buildConnectInstallConnectionStatusClassName = (
  tone: ConnectInstallConnectionTone,
): string => `mt-3 text-sm ${CONNECT_INSTALL_CONNECTION_TONE_CLASS_NAME[tone]}`;
