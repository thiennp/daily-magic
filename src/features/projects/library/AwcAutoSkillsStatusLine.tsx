interface AwcAutoSkillsStatusLineProps {
  readonly status: { readonly paused: boolean; readonly line: string };
  readonly detail: string;
  /** Last line the computer reported, e.g. what the scan read. */
  readonly note: string | null;
}

/** One-line state of auto skills: paused reason or details, plus the last scan note. */
export default function AwcAutoSkillsStatusLine({
  status,
  detail,
  note,
}: AwcAutoSkillsStatusLineProps) {
  return (
    <p
      role="status"
      className={`rounded-lg px-3 py-2 text-[13px] ${
        status.paused
          ? "bg-awc-warn-soft text-awc-warn"
          : "bg-white/70 text-awc-fg-muted dark:bg-white/[0.04] dark:text-gray-300"
      }`}
    >
      {status.paused ? status.line : detail}
      {note !== null ? (
        <span className="mt-0.5 block text-awc-fg dark:text-gray-200">
          {note}
        </span>
      ) : null}
    </p>
  );
}
