import {
  DEVICE_VERIFY_COPY,
  deviceVerifyMessageForErrorCode,
} from "@/features/agent-access/device-verify/deviceVerifyCopy.constant";
import { DEVICE_VERIFY_STATE_COPY } from "@/features/agent-access/device-verify/deviceVerifyStateCopy.constant";

export type DeviceVerifyTone = "success" | "error" | "info";

export type DeviceVerifyView = {
  readonly message: string | null;
  readonly tone: DeviceVerifyTone;
  readonly canDecide: boolean;
  /** Show the "next step: project owner approves" block. */
  readonly showNextStep: boolean;
};

type RowLike = {
  readonly status: string;
  readonly ownerUserId: string | null;
} | null;

const view = (
  message: string | null,
  tone: DeviceVerifyTone,
  extra: Partial<DeviceVerifyView> = {},
): DeviceVerifyView => ({
  message,
  tone,
  canDecide: false,
  showNextStep: false,
  ...extra,
});

/**
 * Verify page state from the stored row, never from `?done=` alone: a
 * `done` flag is only honoured when the row agrees and this viewer decided it.
 */
export const resolveDeviceVerifyView = (input: {
  readonly done: string;
  readonly errorCode: string;
  readonly rawCode: string;
  readonly row: RowLike;
  readonly viewerUserId: string;
  readonly rateLimited: boolean;
}): DeviceVerifyView => {
  const { row } = input;
  if (input.rateLimited) return view(DEVICE_VERIFY_COPY.rateLimited, "error");
  const pending = row?.status === "pending";
  if (input.errorCode.length > 0) {
    return view(deviceVerifyMessageForErrorCode(input.errorCode), "error", {
      canDecide: pending,
    });
  }
  if (row === null) {
    return input.rawCode.trim().length > 0
      ? view(DEVICE_VERIFY_COPY.notFound, "error")
      : view(null, "info");
  }
  if (pending) return view(null, "info", { canDecide: true });
  if (row.status === "expired")
    return view(DEVICE_VERIFY_COPY.expired, "error");
  const mine = row.ownerUserId === input.viewerUserId;
  const owned = row.status === "approved" || row.status === "consumed";
  if (owned && mine) {
    const message =
      input.done === "confirmed"
        ? DEVICE_VERIFY_COPY.confirmed
        : DEVICE_VERIFY_STATE_COPY.alreadyOwner;
    return view(message, "success", { showNextStep: true });
  }
  if (row.status === "denied" && mine) {
    return view(DEVICE_VERIFY_COPY.denied, "info");
  }
  return view(DEVICE_VERIFY_COPY.alreadyDecided, "error");
};
