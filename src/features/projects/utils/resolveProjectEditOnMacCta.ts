import type { MacDevicePresence } from "@/features/agent-witch/online-wake/public-api/types";
import {
  isMacPresenceTierHardOffline,
  resolveMacPresenceTier,
} from "@/features/agent-witch/online-wake/public-api/presentation";
import buildAgentWitchLocalProjectEditorHref from "@/lib/projects/buildAgentWitchLocalProjectEditorHref";
import { formatRelativeTimeAgo } from "@/lib/time/formatRelativeTimeAgo";

export type ProjectEditOnMacCtaState =
  "enabled" | "wrong_mac" | "offline" | "reconnecting" | "unknown_device";

export interface ProjectEditOnMacCta {
  readonly state: ProjectEditOnMacCtaState;
  readonly buttonLabel: string;
  readonly helperText: string | null;
  readonly href: string | null;
}

export interface ResolveProjectEditOnMacCtaInput {
  readonly projectId: string;
  readonly deviceDisplayName: string;
  readonly device: MacDevicePresence | null;
  readonly deviceLastSeenAt: string | null;
  readonly isThisMac: boolean;
}

/** Shell Connect hash — scrolls to Computers rail (never hide Connect). */
const CONNECT_THIS_COMPUTER_HREF = "/#awc-connect";

const resolveProjectEditOnMacCta = (
  input: ResolveProjectEditOnMacCtaInput,
): ProjectEditOnMacCta => {
  const deviceName = input.deviceDisplayName.trim() || "computer";

  if (input.device === null) {
    return {
      state: "unknown_device",
      buttonLabel: "Connect this computer",
      helperText: null,
      href: CONNECT_THIS_COMPUTER_HREF,
    };
  }

  const tier = resolveMacPresenceTier(input.device);

  if (tier === "live_other_instance") {
    return {
      state: "reconnecting",
      buttonLabel: "Connect this computer",
      helperText: "Reconnecting…",
      href: CONNECT_THIS_COMPUTER_HREF,
    };
  }

  if (isMacPresenceTierHardOffline(tier)) {
    const lastSeen = formatRelativeTimeAgo(input.deviceLastSeenAt);
    const lastSeenSuffix = lastSeen !== null ? ` · last seen ${lastSeen}` : "";
    return {
      state: "offline",
      // HN-H3: header owns Connect while offline (not a greyed Edit).
      buttonLabel: "Connect this computer",
      helperText: `${deviceName} is offline right now${lastSeenSuffix}.`,
      href: CONNECT_THIS_COMPUTER_HREF,
    };
  }

  if (input.isThisMac) {
    return {
      state: "enabled",
      buttonLabel: "Edit on this computer",
      helperText: null,
      href: buildAgentWitchLocalProjectEditorHref(input.projectId),
    };
  }

  return {
    state: "wrong_mac",
    buttonLabel: "Edit on this computer",
    helperText: `Open this page on ${deviceName} to edit.`,
    href: null,
  };
};

/**
 * Offline / reconnecting: status line owns the presence copy; Connect is the
 * header action (href set). Helper text only when it adds a reason the status
 * line does not already say (wrong Mac).
 */
export const shouldShowProjectEditOnMacHelperText = (
  state: ProjectEditOnMacCtaState,
): boolean => state === "wrong_mac";

export default resolveProjectEditOnMacCta;
