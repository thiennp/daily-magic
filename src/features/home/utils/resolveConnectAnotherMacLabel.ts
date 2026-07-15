import { MAC_WORKER_BENEFIT_COPY } from "@/lib/copy/macWorkerBenefitCopy.constant";

export const resolveConnectAnotherMacLabel = (
  hasExistingDevices: boolean,
): string =>
  hasExistingDevices
    ? MAC_WORKER_BENEFIT_COPY.addAnotherMac
    : MAC_WORKER_BENEFIT_COPY.addMac;
