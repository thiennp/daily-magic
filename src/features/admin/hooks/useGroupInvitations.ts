"use client";

import { useCallback, useEffect, useState } from "react";

export type GroupInvitationView = {
  readonly id: string;
  readonly groupName: string;
  readonly role: string;
  readonly invitedByName: string | null;
};

/** The company invitations waiting for the signed-in user, with accept and decline. */
export const useGroupInvitations = (onJoined: () => void) => {
  const [invitations, setInvitations] = useState<
    readonly GroupInvitationView[]
  >([]);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async (): Promise<void> => {
    const response = await fetch("/api/groups/invites").catch(() => null);
    if (response === null || !response.ok) return;
    const data = (await response.json()) as {
      invites?: readonly GroupInvitationView[];
    };
    setInvitations(data.invites ?? []);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void fetch("/api/groups/invites", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { invites?: readonly GroupInvitationView[] } | null) => {
        if (data !== null) setInvitations(data.invites ?? []);
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  const decide = async (id: string, decision: "accept" | "decline") => {
    setBusyId(id);
    setError(null);
    const response = await fetch(`/api/groups/invites/${id}/${decision}`, {
      method: "POST",
    }).catch(() => null);
    setBusyId(null);
    if (response === null || !response.ok) {
      setError("Could not answer this invitation. Try again.");
      await reload();
      return;
    }
    await reload();
    if (decision === "accept") onJoined();
  };

  return { invitations, busyId, error, decide };
};
