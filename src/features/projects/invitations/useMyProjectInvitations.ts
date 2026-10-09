"use client";

import { useCallback, useEffect, useState } from "react";

import type { MyPendingHumanInvite } from "@/lib/projects/acl/humanInvites/listMyPendingHumanInvites";

/** Invitations waiting for the signed-in user; `open` goes to the accept page. */
export const useMyProjectInvitations = () => {
  const [invitations, setInvitations] = useState<
    readonly MyPendingHumanInvite[]
  >([]);
  const [openingId, setOpeningId] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    void fetch("/api/invitations", {
      cache: "no-store",
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.json() : { invitations: [] }))
      .then((data: { invitations?: MyPendingHumanInvite[] }) =>
        setInvitations(data.invitations ?? []),
      )
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  const open = useCallback(async (inviteId: string) => {
    setOpeningId(inviteId);
    setFailed(false);
    try {
      const res = await fetch(
        `/api/invitations/${encodeURIComponent(inviteId)}/open`,
        { method: "POST" },
      );
      const data = (await res.json().catch(() => ({}))) as { path?: string };
      if (res.ok && typeof data.path === "string") {
        window.location.assign(data.path);
        return;
      }
      setFailed(true);
      setInvitations((all) => all.filter((i) => i.id !== inviteId));
    } catch {
      setFailed(true);
    } finally {
      setOpeningId(null);
    }
  }, []);

  return { invitations, openingId, failed, open };
};
