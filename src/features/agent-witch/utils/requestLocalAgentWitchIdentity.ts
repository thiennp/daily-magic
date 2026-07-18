import { resolveAgentWitchWakeBaseUrlForPage } from "@/features/agent-witch/online-wake";

export interface LocalAgentWitchIdentity {
  readonly hostname: string;
  readonly profiles: readonly {
    readonly email: string | null;
    readonly launchAgentLabel: string;
  }[];
}

const parseLocalAgentWitchIdentity = (
  payload: unknown,
): LocalAgentWitchIdentity | null => {
  if (typeof payload !== "object" || payload === null) {
    return null;
  }

  const record = payload as {
    hostname?: unknown;
    profiles?: unknown;
  };

  if (
    typeof record.hostname !== "string" ||
    record.hostname.trim().length === 0
  ) {
    return null;
  }

  const profiles = Array.isArray(record.profiles)
    ? record.profiles.flatMap((profile) => {
        if (typeof profile !== "object" || profile === null) {
          return [];
        }

        const launchAgentLabel =
          typeof (profile as { launchAgentLabel?: unknown })
            .launchAgentLabel === "string"
            ? (profile as { launchAgentLabel: string }).launchAgentLabel
            : "";

        if (launchAgentLabel.length === 0) {
          return [];
        }

        const emailValue = (profile as { email?: unknown }).email;
        return [
          {
            email: typeof emailValue === "string" ? emailValue : null,
            launchAgentLabel,
          },
        ];
      })
    : [];

  return {
    hostname: record.hostname.trim(),
    profiles,
  };
};

export const requestLocalAgentWitchIdentity =
  async (): Promise<LocalAgentWitchIdentity | null> => {
    if (typeof window === "undefined") {
      return null;
    }

    try {
      const response = await fetch(
        `${resolveAgentWitchWakeBaseUrlForPage()}/identity`,
        {
          method: "GET",
          mode: "cors",
          signal: AbortSignal.timeout(2_000),
        },
      );

      if (!response.ok) {
        return null;
      }

      const payload: unknown = await response.json();
      return parseLocalAgentWitchIdentity(payload);
    } catch {
      return null;
    }
  };
