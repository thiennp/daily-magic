"use client";

import { useMyProjectInvitations } from "@/features/projects/invitations/useMyProjectInvitations";

/** "You're invited" cards, so an invitation is not only an email. */
export default function AwcMyProjectInvitations() {
  const { invitations, openingId, failed, open } = useMyProjectInvitations();
  if (invitations.length === 0 && !failed) return null;
  return (
    <section
      aria-label="Project invitations"
      className="mb-5 flex flex-col gap-2"
    >
      {invitations.map((invite) => (
        <div
          key={invite.id}
          className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-awc-border bg-awc-surface-2 px-4 py-3 dark:bg-white/[0.03]"
        >
          <p className="m-0 text-sm text-awc-fg">
            <strong>{invite.inviterName}</strong> invited you to join{" "}
            <strong>{invite.projectName}</strong>
            {invite.role === "viewer" ? " as a viewer" : ""}.
          </p>
          <button
            type="button"
            disabled={openingId !== null}
            onClick={() => void open(invite.id)}
            className="rounded-lg bg-awc-blue-600 px-3.5 py-1.5 text-[13px] font-semibold text-white disabled:opacity-60"
          >
            {openingId === invite.id ? "Opening…" : "View invitation"}
          </button>
        </div>
      ))}
      {failed ? (
        <p role="alert" className="m-0 text-[13px] text-awc-bad">
          This invitation is no longer available.
        </p>
      ) : null}
    </section>
  );
}
