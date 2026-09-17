import type { MacDevicePresence } from "@/features/agent-witch/online-wake/macDevicePresence";
import {
  isMacPresenceTierHardOffline,
  resolveMacPresenceTier,
} from "@/features/agent-witch/online-wake/macDevicePresence";
import buildAgentWitchLocalProjectEditorHref from "@/lib/projects/buildAgentWitchLocalProjectEditorHref";
import { formatLastSeenText } from "@/lib/time/formatRelativeTimeAgo";

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

const resolveProjectEditOnMacCta = (
  input: ResolveProjectEditOnMacCtaInput,
): ProjectEditOnMacCta => {
  const deviceName = input.deviceDisplayName.trim() || "Mac";

  if (input.device === null) {
    return {
      state: "unknown_device",
      buttonLabel: "Edit on this Mac",
      helperText: "Connect a Mac to edit this project.",
      href: null,
    };
  }

  const tier = resolveMacPresenceTier(input.device);

  if (tier === "live_other_instance") {
    return {
      state: "reconnecting",
      buttonLabel: "Edit on this Mac",
      helperText: "Reconnecting…",
      href: null,
    };
  }

  if (isMacPresenceTierHardOffline(tier)) {
    const lastSeen = formatLastSeenText(input.deviceLastSeenAt);
    const lastSeenSuffix = lastSeen !== null ? ` · last seen ${lastSeen}` : "";
    return {
      state: "offline",
      buttonLabel: "Edit on this Mac",
      helperText: `${deviceName} is offline right now${lastSeenSuffix}.`,
      href: null,
    };
  }

  if (input.isThisMac) {
    return {
      state: "enabled",
      buttonLabel: "Edit on this Mac →",
      helperText: null,
      href: buildAgentWitchLocalProjectEditorHref(input.projectId),
    };
  }

  return {
    state: "wrong_mac",
    buttonLabel: "Edit on this Mac",
    helperText: `Open this page on ${deviceName} to edit.`,
    href: null,
  };
};

export default resolveProjectEditOnMacCta;
