import { APP_SHELL_COMPUTERS_COPY } from "@/features/shell/v5/appShellComputersCopy.constant";

export type DeviceUpdateAction =
  | { readonly kind: "hidden" }
  | { readonly kind: "enabled"; readonly label: string }
  | { readonly kind: "badge"; readonly label: string }
  | { readonly kind: "disabled"; readonly reason: string; readonly label: string };

const updateLabel = (latestVersion: string | null): string => {
  const trimmed = (latestVersion ?? "").trim().replace(/^v/i, "");
  return trimmed.length > 0
    ? `Update v${trimmed}`
    : APP_SHELL_COMPUTERS_COPY.update;
};

/**
 * HN-H3 Computers Update hierarchy:
 * - Offline / remote: amber badge only (no greyed Update button).
 * - Online this computer: enabled Update button.
 * Never hide the Download AgentWitch Local shell link (separate control).
 */
export const resolveDeviceUpdateAction = (input: {
  readonly needsUpdate: boolean;
  readonly isOffline: boolean;
  readonly canUpdateHere: boolean;
  readonly latestVersion?: string | null;
}): DeviceUpdateAction => {
  if (!input.needsUpdate) {
    return { kind: "hidden" };
  }

  const badgeLabel = updateLabel(input.latestVersion ?? null);

  if (input.isOffline || !input.canUpdateHere) {
    return { kind: "badge", label: badgeLabel };
  }

  const trimmed = (input.latestVersion ?? "").trim().replace(/^v/i, "");
  const enabledLabel =
    trimmed.length > 0 ? `Update to v${trimmed}` : APP_SHELL_COMPUTERS_COPY.update;
  return { kind: "enabled", label: enabledLabel };
};
