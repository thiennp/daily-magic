"use client";

import { useEffect, useState } from "react";

export interface AgentWitchServerReleaseView {
  readonly label: string;
  readonly shortCommitSha: string | null;
  readonly commitSha: string | null;
  readonly deviceSupersessionMigrationApplied: boolean;
}

const parseHealthReleasePayload = (
  payload: unknown,
): AgentWitchServerReleaseView | null => {
  if (typeof payload !== "object" || payload === null) {
    return null;
  }

  const record = payload as Record<string, unknown>;
  const release = record.release;

  if (typeof release !== "object" || release === null) {
    return null;
  }

  const releaseRecord = release as Record<string, unknown>;
  const label = releaseRecord.label;

  if (typeof label !== "string" || label.length === 0) {
    return null;
  }

  const commitSha =
    typeof releaseRecord.commitSha === "string"
      ? releaseRecord.commitSha
      : null;
  const shortCommitSha =
    typeof releaseRecord.shortCommitSha === "string"
      ? releaseRecord.shortCommitSha
      : null;

  return {
    label,
    commitSha,
    shortCommitSha,
    deviceSupersessionMigrationApplied:
      record.deviceSupersessionMigrationApplied === true,
  };
};

const useAgentWitchServerRelease = (): {
  readonly release: AgentWitchServerReleaseView | null;
  readonly isLoading: boolean;
} => {
  const [release, setRelease] = useState<AgentWitchServerReleaseView | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();

    void fetch("/api/health", {
      method: "GET",
      signal: abortController.signal,
      cache: "no-store",
    })
      .then(async (response) => {
        if (!response.ok) {
          return null;
        }

        const payload: unknown = await response.json();
        return parseHealthReleasePayload(payload);
      })
      .then((parsed) => {
        if (!abortController.signal.aborted) {
          setRelease(parsed);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => {
      abortController.abort();
    };
  }, []);

  return { release, isLoading };
};

export default useAgentWitchServerRelease;
