import {
  countMacPresenceTiers,
  type MacDevicePresence,
} from "@/features/agent-witch/online-wake/macDevicePresence";

export type HomeMacStatusTone = "online" | "sleeping" | "offline" | "none";

export interface HomeMacStatusSummary {
  readonly tone: HomeMacStatusTone;
  readonly label: string;
  readonly detail: string;
}

export const resolveHomeMacStatusSummary = (
  devices: readonly MacDevicePresence[],
): HomeMacStatusSummary => {
  if (devices.length === 0) {
    return {
      tone: "none",
      label: "No Mac connected",
      detail: "Install Agent Witch on your Mac to run tasks from the browser.",
    };
  }

  const counts = countMacPresenceTiers(devices);

  if (counts.live > 0) {
    const suffix =
      counts.liveOtherInstance > 0
        ? " Additional Macs are connected on another server."
        : "";
    return {
      tone: "online",
      label: "Mac online",
      detail: `${counts.live} Mac${counts.live === 1 ? "" : "s"} ready to run tasks.${suffix}`,
    };
  }

  if (counts.liveOtherInstance > 0) {
    return {
      tone: "sleeping",
      label: "Mac reconnecting",
      detail:
        "Your Mac is connected on another server. Wait a few seconds or refresh, then try again.",
    };
  }

  if (counts.recent > 0) {
    return {
      tone: "sleeping",
      label: "Mac reconnecting",
      detail:
        "Agent Witch was seen recently and may reconnect on the next check-in. Start it on your Mac with wake.sh if it stays offline.",
    };
  }

  return {
    tone: "offline",
    label: "Mac offline",
    detail: "Start Agent Witch on your Mac to run new tasks.",
  };
};
