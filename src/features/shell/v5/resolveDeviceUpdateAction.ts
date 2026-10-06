import { APP_SHELL_COMPUTERS_COPY } from "@/features/shell/v5/appShellComputersCopy.constant";

export type DeviceUpdateAction =
  | { readonly kind: "hidden" }
  | { readonly kind: "enabled" }
  | { readonly kind: "disabled"; readonly reason: string };

/**
 * Computers row Update control (V5-2). Shown whenever the computer is behind
 * the latest version. Offline → disabled + offline reason. Online elsewhere
 * (not this computer) → disabled + "Update it from that computer." (never
 * hidden). Online this computer → enabled. Reasons always visible (#29).
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
      reason: APP_SHELL_COMPUTERS_COPY.updateDisabledOffline,
    };
  }

  return input.canUpdateHere
    ? { kind: "enabled" }
    : {
        kind: "disabled",
        reason: APP_SHELL_COMPUTERS_COPY.updateDisabledRemote,
      };
};
