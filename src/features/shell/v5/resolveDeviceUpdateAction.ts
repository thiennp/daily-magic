import { APP_SHELL_DEVICES_COPY } from "@/features/shell/v5/appShellDevicesCopy.constant";

export type DeviceUpdateAction =
  | { readonly kind: "hidden" }
  | { readonly kind: "enabled" }
  | { readonly kind: "disabled"; readonly reason: string };

/**
 * Devices row Update control (V5-2). Shown only when the device is behind the
 * latest version. Offline → disabled with a reason that is always visible
 * (#29). Online → enabled only where an update path exists today (this
 * computer); otherwise hidden rather than a dead button.
 */
export const resolveDeviceUpdateAction = (input: {
  readonly needsUpdate: boolean;
  readonly isOffline: boolean;
  readonly canUpdateHere: boolean;
}): DeviceUpdateAction => {
  if (!input.needsUpdate) {
    return { kind: "hidden" };
  }

  if (input.isOffline) {
    return {
      kind: "disabled",
      reason: APP_SHELL_DEVICES_COPY.updateDisabledOffline,
    };
  }

  return input.canUpdateHere ? { kind: "enabled" } : { kind: "hidden" };
};
