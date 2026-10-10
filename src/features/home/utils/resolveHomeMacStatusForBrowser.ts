import type { MacDevicePresence } from "@/features/agent-witch/online-wake/public-api/types";
import {
  resolveHomeMacStatusSummary,
  type HomeMacStatusSummary,
} from "@/features/home/utils/resolveHomeMacStatusSummary";

export const resolveHomeMacStatusForBrowser = (input: {
  readonly devices: readonly MacDevicePresence[];
  readonly shouldShowConnectThisMac: boolean;
}): HomeMacStatusSummary => {
  const summary = resolveHomeMacStatusSummary(input.devices);

  if (!input.shouldShowConnectThisMac || summary.tone === "online") {
    return summary;
  }

  if (summary.tone === "none") {
    return summary;
  }

  return {
    tone: "offline",
    label: "This computer is not linked",
    detail:
      "Connect this computer to run tasks from the computer you are using now.",
  };
};
