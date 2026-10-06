import { APP_SHELL_DEVICES_COPY } from "@/features/shell/v5/appShellDevicesCopy.constant";
import { MAC_WORKER_BENEFIT_COPY } from "@/lib/copy/macWorkerBenefitCopy.constant";

/** With devices: locked v5 `devices.connectAnother` (button + modal title). */
export const resolveConnectAnotherMacLabel = (
  hasExistingDevices: boolean,
): string =>
  hasExistingDevices
    ? APP_SHELL_DEVICES_COPY.connectAnother
    : MAC_WORKER_BENEFIT_COPY.addMac;
