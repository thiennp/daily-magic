"use client";

interface AwcProjectAccessAutoApprovedBannerProps {
  readonly message: string | null | undefined;
}

/** Emerald status line after a pending bot is auto-approved. */
export default function AwcProjectAccessAutoApprovedBanner({
  message,
}: AwcProjectAccessAutoApprovedBannerProps) {
  if (!message) {
    return null;
  }

  return (
    <p
      role="status"
      className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1.5 text-xs font-medium text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-200"
    >
      {message}
    </p>
  );
}
