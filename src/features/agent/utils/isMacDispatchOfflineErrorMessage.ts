import {
  MAC_OFFLINE_FOR_ACCOUNT_ERROR,
  TEAMMATE_MAC_OFFLINE_ERROR,
} from "@/lib/agentWitch/macOfflineForAccountErrorMessage.constant";

const MAC_DISPATCH_OFFLINE_ERROR_MESSAGES = [
  "The selected Mac is not online right now.",
  MAC_OFFLINE_FOR_ACCOUNT_ERROR,
  TEAMMATE_MAC_OFFLINE_ERROR,
] as const;

export const isMacDispatchOfflineErrorMessage = (message: string): boolean => {
  const trimmed = message.trim();
  return MAC_DISPATCH_OFFLINE_ERROR_MESSAGES.some(
    (candidate) => candidate === trimmed,
  );
};
