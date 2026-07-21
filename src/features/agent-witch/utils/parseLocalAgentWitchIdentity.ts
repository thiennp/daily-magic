export interface LocalAgentWitchIdentity {
  readonly hostname: string;
  readonly tokenHash: string | null;
  readonly tokenHashes: readonly string[];
  readonly profiles: readonly {
    readonly email: string | null;
    readonly launchAgentLabel: string;
  }[];
}

const parseTokenHashes = (
  record: Record<string, unknown>,
  activeTokenHash: string | null,
): readonly string[] => {
  if (!Array.isArray(record.tokenHashes)) {
    return activeTokenHash !== null ? [activeTokenHash] : [];
  }

  const hashes = record.tokenHashes.flatMap((value) => {
    if (typeof value !== "string" || value.trim().length === 0) {
      return [];
    }
    return [value.trim().toLowerCase()];
  });

  if (hashes.length > 0) {
    return [...new Set(hashes)];
  }

  return activeTokenHash !== null ? [activeTokenHash] : [];
};

export const parseLocalAgentWitchIdentity = (
  payload: unknown,
): LocalAgentWitchIdentity | null => {
  if (typeof payload !== "object" || payload === null) {
    return null;
  }

  const record = payload as Record<string, unknown>;

  if (
    typeof record.hostname !== "string" ||
    record.hostname.trim().length === 0
  ) {
    return null;
  }

  const tokenHash =
    typeof record.tokenHash === "string" && record.tokenHash.trim().length > 0
      ? record.tokenHash.trim().toLowerCase()
      : null;

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
    tokenHash,
    tokenHashes: parseTokenHashes(record, tokenHash),
    profiles,
  };
};
