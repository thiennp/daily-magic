import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/awcProjectMessengerCopy.constant";
import type { AwcMessengerBotStatus } from "@/features/projects/messenger/types/awcProjectMessenger.type";

export const formatMessengerBotStatusLabel = (
  status: AwcMessengerBotStatus,
): string => {
  const copy = AWC_PROJECT_MESSENGER_COPY;
  if (status === "working") return copy.statusWorking;
  if (status === "silent") return copy.statusSilent;
  return copy.statusIdle;
};
