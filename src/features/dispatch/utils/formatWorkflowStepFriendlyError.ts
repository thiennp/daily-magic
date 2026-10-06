const EXIT_CODE_PATTERN = /exit code (\d+)/i;
const NO_MAC_PATTERN = /no mac|no computer|not connected|device/i;

export const formatWorkflowStepFriendlyError = (
  rawMessage: string,
): { readonly headline: string; readonly detail: string | null } => {
  const trimmed = rawMessage.trim();
  if (trimmed.length === 0) {
    return {
      headline: "Something went wrong on your computer.",
      detail: null,
    };
  }

  if (NO_MAC_PATTERN.test(trimmed)) {
    return {
      headline: "Your computer is not connected right now.",
      detail: "Open AgentWitch on this computer, then tap Try again.",
    };
  }

  if (EXIT_CODE_PATTERN.test(trimmed)) {
    return {
      headline: "This step could not finish on your computer.",
      detail: trimmed,
    };
  }

  if (trimmed.length > 120) {
    return {
      headline: "This step could not finish.",
      detail: trimmed,
    };
  }

  return { headline: trimmed, detail: null };
};

export default formatWorkflowStepFriendlyError;
