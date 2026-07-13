interface LinkSessionResult {
  readonly ok: boolean;
  readonly linkToken?: string;
  readonly profileEmail?: string;
  readonly errorMessage?: string;
}

const parseLinkSessionPayload = (sessionData: unknown): LinkSessionResult => {
  const linkToken =
    typeof sessionData === "object" &&
    sessionData !== null &&
    "linkToken" in sessionData &&
    typeof (sessionData as { linkToken: unknown }).linkToken === "string"
      ? (sessionData as { linkToken: string }).linkToken
      : "";
  const profileEmail =
    typeof sessionData === "object" &&
    sessionData !== null &&
    "email" in sessionData &&
    typeof (sessionData as { email: unknown }).email === "string"
      ? (sessionData as { email: string }).email
      : "";

  if (linkToken.length === 0 || profileEmail.length === 0) {
    return { ok: false, errorMessage: "Missing link session from server." };
  }

  return { ok: true, linkToken, profileEmail };
};

export const fetchAgentWitchLinkSession =
  async (): Promise<LinkSessionResult> => {
    try {
      const sessionResponse = await fetch("/api/agent-witch/link-session", {
        method: "POST",
        signal: AbortSignal.timeout(10_000),
      });

      if (!sessionResponse.ok) {
        return {
          ok: false,
          errorMessage: "Could not start account linking session.",
        };
      }

      const sessionData: unknown = await sessionResponse.json();
      return parseLinkSessionPayload(sessionData);
    } catch (error) {
      if (error instanceof DOMException && error.name === "TimeoutError") {
        return {
          ok: false,
          errorMessage:
            "Linking timed out while starting the session. Refresh and try again.",
        };
      }

      return {
        ok: false,
        errorMessage: "Could not start account linking session.",
      };
    }
  };
