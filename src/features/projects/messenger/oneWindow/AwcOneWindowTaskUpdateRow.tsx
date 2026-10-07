interface AwcOneWindowTaskUpdateRowProps {
  readonly who: string;
  readonly textHtmlSafe: string;
  readonly statusLabel: string;
  readonly statusTone?: "ok" | "warn" | "info";
  readonly timeLabel: string;
}

/** Task-update line in the unified feed. */
export default function AwcOneWindowTaskUpdateRow({
  who,
  textHtmlSafe,
  statusLabel,
  statusTone = "info",
  timeLabel,
}: AwcOneWindowTaskUpdateRowProps) {
  const tone =
    statusTone === "ok"
      ? "bg-emerald-50 text-emerald-800"
      : statusTone === "warn"
        ? "bg-awc-warn-soft text-awc-warn"
        : "bg-awc-accent-soft text-awc-blue-700";
  return (
    <div className="flex max-w-[760px] flex-wrap items-center gap-2 text-[13px] text-awc-fg">
      <div
        className="grid h-7 w-7 place-items-center rounded-full bg-awc-tile-2 text-[10px] font-semibold text-awc-fg-muted"
        aria-hidden
      >
        {who.slice(0, 2).toUpperCase()}
      </div>
      <span className="min-w-0 flex-1">
        <b>{who}</b> {textHtmlSafe}
      </span>
      <span className={`rounded-full px-2 py-0.5 text-[12px] ${tone}`}>{statusLabel}</span>
      <span className="text-[12px] text-awc-fg-subtle">{timeLabel}</span>
    </div>
  );
}
