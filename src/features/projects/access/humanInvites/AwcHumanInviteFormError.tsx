"use client";

/** Inline form error — announced to screen readers; email input points at it. */
export default function AwcHumanInviteFormError({
  message,
}: {
  readonly message: string | null;
}) {
  if (message === null) return null;
  return (
    <p id="inv-err" role="alert" className="text-sm text-awc-bad">
      {message}
    </p>
  );
}
