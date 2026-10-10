import { APP_SHELL_COMPUTERS_COPY } from "@/features/shell/v5/public-api/types";

/**
 * Locked v5 EN (button + modal title): zero computers → "Connect this
 * computer" (same verb as Home Connect); with computers → "Connect another
 * computer". Never "Add a computer".
 */
export const resolveConnectAnotherMacLabel = (
  hasExistingDevices: boolean,
): string =>
  hasExistingDevices
    ? APP_SHELL_COMPUTERS_COPY.connectAnother
    : APP_SHELL_COMPUTERS_COPY.connectThis;
