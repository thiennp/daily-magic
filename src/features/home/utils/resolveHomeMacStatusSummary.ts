import type { MacDevicePresence } from "@/features/agent-witch/online-wake/public-api/types";
import { countMacPresenceTiers } from "@/features/agent-witch/online-wake/public-api/presentation";

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
      label: "No computer connected",
      detail:
        "Install AgentWitch on your computer to run tasks from the browser.",
    };
  }

  const counts = countMacPresenceTiers(devices);

  if (counts.live > 0) {
    const suffix =
      counts.liveOtherInstance > 0
        ? " Additional computers are connected on another server."
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
        "Your computer is connected on another server. Wait a few seconds or refresh, then try again.",
    };
  }

  if (counts.recent > 0) {
    return {
      tone: "sleeping",
      label: "Mac reconnecting",
      detail:
        "AgentWitch was seen recently and may reconnect on the next check-in. Start it on your computer with wake.sh if it stays offline.",
    };
  }

  return {
    tone: "offline",
    label: "Mac offline",
    detail: "Start AgentWitch on your computer to run new tasks.",
  };
};
