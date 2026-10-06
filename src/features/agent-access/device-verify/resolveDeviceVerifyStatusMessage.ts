import {
  DEVICE_VERIFY_COPY,
  deviceVerifyMessageForErrorCode,
} from "@/features/agent-access/device-verify/deviceVerifyCopy.constant";

type DeviceRequestLike = {
  readonly status: string;
} | null;

export const resolveDeviceVerifyStatusMessage = (input: {
  readonly done: string;
  readonly errorCode: string;
  readonly normalizedLength: number;
  readonly requestRow: DeviceRequestLike;
}): string | null => {
  if (input.done === "confirmed") {
    return DEVICE_VERIFY_COPY.confirmed;
  }
  if (input.done === "denied") {
    return DEVICE_VERIFY_COPY.denied;
  }
  if (input.errorCode.length > 0) {
    return deviceVerifyMessageForErrorCode(input.errorCode);
  }
  if (input.requestRow?.status === "expired") {
    return DEVICE_VERIFY_COPY.expired;
  }
  if (input.normalizedLength === 8 && input.requestRow === null) {
    return DEVICE_VERIFY_COPY.notFound;
  }
  if (
    input.requestRow?.status === "approved" ||
    input.requestRow?.status === "denied" ||
    input.requestRow?.status === "consumed"
  ) {
    return DEVICE_VERIFY_COPY.alreadyDecided;
  }
  return null;
};
