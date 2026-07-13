export const AUTO_LINK_LOCAL_AGENT_POLL_MS = 5_000;

export const MAX_REACHABLE_AUTO_LINK_ATTEMPTS = 3;

export const shouldStopAutoLinkAfterFailure = (
  errorMessage: string | undefined,
): boolean => {
  if (errorMessage === undefined || errorMessage.length === 0) {
    return false;
  }

  const normalizedMessage = errorMessage.toLowerCase();
  return (
    normalizedMessage.includes("already linked") ||
    normalizedMessage.includes("revoked") ||
    normalizedMessage.includes("not an allowed")
  );
};
