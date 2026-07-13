export const AGENT_WITCH_WAKE_DEFAULT_PORT = 47892;

export const AGENT_WITCH_WAKE_BASE_URL = `http://127.0.0.1:${AGENT_WITCH_WAKE_DEFAULT_PORT}`;

export const canRequestLocalAgentWitchApi = (): boolean =>
  typeof window !== "undefined";

export const requestLocalAgentLinkAccount = async (input: {
  readonly linkToken: string;
  readonly appOrigin: string;
  readonly profileEmail: string;
}): Promise<{
  readonly ok: boolean;
  readonly email?: string;
  readonly errorMessage?: string;
}> => {
  if (!canRequestLocalAgentWitchApi()) {
    return { ok: false, errorMessage: "Browser environment required." };
  }

  try {
    const response = await fetch(`${AGENT_WITCH_WAKE_BASE_URL}/link-account`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        linkToken: input.linkToken,
        appOrigin: input.appOrigin,
        profileEmail: input.profileEmail,
      }),
      signal: AbortSignal.timeout(30_000),
    });

    const data: unknown = await response.json();
    if (
      response.ok &&
      typeof data === "object" &&
      data !== null &&
      "ok" in data &&
      (data as { ok: boolean }).ok === true
    ) {
      const record = data as { email?: unknown };
      const email = typeof record.email === "string" ? record.email : undefined;
      return { ok: true, email };
    }

    const errorMessage =
      typeof data === "object" &&
      data !== null &&
      "errorMessage" in data &&
      typeof (data as { errorMessage: unknown }).errorMessage === "string"
        ? (data as { errorMessage: string }).errorMessage
        : "Could not link this Mac.";

    return { ok: false, errorMessage };
  } catch (error) {
    if (error instanceof DOMException && error.name === "TimeoutError") {
      return {
        ok: false,
        errorMessage:
          "Linking timed out. Confirm install finished, then open Home on this Mac again.",
      };
    }

    return {
      ok: false,
      errorMessage:
        "Local Agent Witch API is not reachable. Run install on this Mac first.",
    };
  }
};

export const linkLocalAgentToSignedInAccount = async (
  appOrigin: string,
): Promise<{
  readonly ok: boolean;
  readonly email?: string;
  readonly errorMessage?: string;
}> => {
  const sessionResponse = await fetch("/api/agent-witch/link-session", {
    method: "POST",
  });

  if (!sessionResponse.ok) {
    return {
      ok: false,
      errorMessage: "Could not start account linking session.",
    };
  }

  const sessionData: unknown = await sessionResponse.json();
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

  return requestLocalAgentLinkAccount({ linkToken, appOrigin, profileEmail });
};
