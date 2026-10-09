"use client";

import { useGroupInvitations } from "@/features/admin/hooks/useGroupInvitations";

/** Invitations to join a company: nobody is added until they accept here. */
export default function GroupInvitationsInbox() {
  // The company list is loaded once for the page: a full reload shows the company just joined.
  const { invitations, busyId, error, decide } = useGroupInvitations(() => {
    window.location.reload();
  });

  if (invitations.length === 0 && error === null) return null;

  return (
    <section
      aria-label="Invitations"
      className="rounded-xl border border-awc-border bg-awc-surface p-4"
    >
      <h2 className="m-0 text-sm font-semibold text-awc-fg">
        Invitations for you
      </h2>
      <ul className="mt-3 flex flex-col gap-2">
        {invitations.map((invite) => (
          <li
            key={invite.id}
            className="flex flex-wrap items-center justify-between gap-2 text-sm text-awc-fg"
          >
            <span>
              {invite.invitedByName ?? "Someone"} invited you to join{" "}
              <strong>{invite.groupName}</strong>
              {invite.role === "group_admin" ? " as an admin" : ""}.
            </span>
            <span className="flex gap-2">
              <button
                type="button"
                disabled={busyId === invite.id}
                className="rounded-lg border border-awc-border px-3 py-1.5 text-[13px] font-semibold"
                onClick={() => void decide(invite.id, "decline")}
              >
                Decline
              </button>
              <button
                type="button"
                disabled={busyId === invite.id}
                className="rounded-lg bg-awc-primary px-3 py-1.5 text-[13px] font-semibold text-white"
                onClick={() => void decide(invite.id, "accept")}
              >
                Accept
              </button>
            </span>
          </li>
        ))}
      </ul>
      {error !== null ? (
        <p role="alert" className="mt-2 text-sm text-awc-bad">
          {error}
        </p>
      ) : null}
    </section>
  );
}
