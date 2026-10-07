import {
  formatOneWindowPeerLineText,
  type OneWindowPeerLine,
} from "@/features/projects/messenger/utils/formatOneWindowPeerLine";

interface AwcOneWindowPeerRowProps {
  readonly line: OneWindowPeerLine;
  readonly timeLabel: string;
}

/** DF-023: compact bot↔bot line (owner view) — "Kai → AW Lead · Status update · …". */
export default function AwcOneWindowPeerRow({
  line,
  timeLabel,
}: AwcOneWindowPeerRowProps) {
  return (
    <div
      className="flex max-w-[760px] flex-wrap items-center gap-1.5 text-[12.5px] text-awc-fg-muted"
      role="note"
      aria-label={`${formatOneWindowPeerLineText(line)} at ${timeLabel}`}
    >
      <span className="font-semibold text-awc-fg">{line.from}</span>
      <span aria-hidden>→</span>
      <span className="font-semibold text-awc-fg">{line.to}</span>
      <span aria-hidden>·</span>
      <span
        className={
          line.stateOnly
            ? "rounded-full bg-awc-tile-2 px-2 py-0.5 text-[11.5px] text-awc-fg-muted"
            : "text-awc-fg-subtle"
        }
      >
        {line.label}
      </span>
      {line.text.length > 0 ? (
        <>
          <span aria-hidden>·</span>
          <span className="min-w-0 flex-1 truncate">{line.text}</span>
        </>
      ) : null}
      <span className="text-[12px] text-awc-fg-subtle">{timeLabel}</span>
    </div>
  );
}
