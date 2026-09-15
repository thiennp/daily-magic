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
  const connectedCount = counts.live + counts.liveOtherInstance;

  if (connectedCount > 0) {
    const suffix =
      counts.liveOtherInstance > 0
        ? " One Mac is connected on another server."
        : "";
    return {
      tone: "online",
      label: "Mac online",
      detail: `${connectedCount} Mac${connectedCount === 1 ? "" : "s"} ready to run tasks.${suffix}`,
    };
  }

  if (counts.recent > 0) {
    return {
      tone: "sleeping",
      label: "Mac sleeping",
      detail:
        "Agent Witch was seen recently. Open it on your Mac or use wake from a task to reconnect.",
    };
  }

  return {
    tone: "offline",
    label: "Mac offline",
    detail: "Start Agent Witch on your Mac to run new tasks.",
  };
};
