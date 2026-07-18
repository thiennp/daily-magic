import {
  peekAnyPendingAccountLink,
  peekPendingAccountLinkByEmail,
} from "@/lib/agentWitch/pendingAccountLinkRegistry";

export const buildPendingAccountLinkAckPayload = (
  email: string | null | undefined,
  isClaimed: boolean,
): Readonly<Record<string, unknown>> | null => {
  if (isClaimed) {
    return null;
  }

  const pending =
    email !== null && email !== undefined && email.trim().length > 0
      ? peekPendingAccountLinkByEmail(email)
      : peekAnyPendingAccountLink();

  if (pending === null) {
    return null;
  }

  return {
    linkToken: pending.linkToken,
    email: pending.email,
    appOrigin: pending.appOrigin,
  };
};
