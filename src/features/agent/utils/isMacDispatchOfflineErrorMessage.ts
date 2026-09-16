import {
  MAC_RECONNECTING_QUEUED_ERROR,
  MAC_RECONNECTING_RETRY_ERROR,
  MAC_REPLACED_ERROR,
} from "@/lib/agentWitch/agentWitchDispatchErrorCode.constant";
import { MAC_OFFLINE_FOR_ACCOUNT_ERROR } from "@/lib/agentWitch/macOfflineForAccountErrorMessage.constant";

const MAC_DISPATCH_OFFLINE_ERROR_MESSAGES = [
  MAC_RECONNECTING_RETRY_ERROR,
  MAC_RECONNECTING_QUEUED_ERROR,
  MAC_REPLACED_ERROR,
  MAC_OFFLINE_FOR_ACCOUNT_ERROR,
] as const;

export const isMacDispatchOfflineErrorMessage = (message: string): boolean => {
  const trimmed = message.trim();
  return MAC_DISPATCH_OFFLINE_ERROR_MESSAGES.some(
    (candidate) => candidate === trimmed,
  );
};
