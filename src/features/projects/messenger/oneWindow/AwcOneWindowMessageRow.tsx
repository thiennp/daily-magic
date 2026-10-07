import {
  OW_BUBBLE_OTHER_CLASS,
  OW_BUBBLE_SELF_CLASS,
  OW_STATUS_TONE_CLASS,
} from "@/features/projects/messenger/oneWindow/awcOneWindowChrome.constant";

interface AwcOneWindowMessageRowProps {
  readonly who: string;
  readonly isSelf: boolean;
  readonly isAssistant?: boolean;
  readonly toLabel?: string;
  readonly timeLabel: string;
  readonly text: string;
  /** OW-H5: live task-update status pill (e.g. Done / Blocked). */
  readonly status?: {
    readonly label: string;
    readonly tone: keyof typeof OW_STATUS_TONE_CLASS;
  };
}

/** Chat bubble row matching One-window HTML. */
export default function AwcOneWindowMessageRow({
  who,
  isSelf,
  isAssistant = false,
  toLabel,
  timeLabel,
  text,
  status,
}: AwcOneWindowMessageRowProps) {
  return (
    <article
      className={`grid max-w-[760px] grid-cols-[30px_minmax(0,1fr)] gap-2.5 ${
        isSelf ? "ml-auto grid-cols-[minmax(0,1fr)_30px]" : ""
      }`}
      aria-label={`${who} at ${timeLabel}`}
    >
      <div
        className={`grid h-[30px] w-[30px] place-items-center rounded-full bg-awc-tile-2 text-[11px] font-semibold text-awc-fg-muted ${
          isSelf ? "order-2" : ""
        }`}
        aria-hidden
      >
        {who.slice(0, 2).toUpperCase()}
      </div>
      <div className="min-w-0">
        <div
          className={`flex flex-wrap items-center gap-1.5 text-[12.5px] ${
            isSelf ? "justify-end" : ""
          }`}
        >
          <span className="font-semibold text-awc-fg">{isSelf ? "You" : who}</span>
          {isAssistant ? (
            <span className="rounded bg-awc-tile-2 px-1.5 py-0.5 text-[11px] text-awc-fg-muted">
              Assistant
            </span>
          ) : null}
          {toLabel !== undefined && toLabel.length > 0 ? (
            <span className="text-awc-fg-subtle">{toLabel}</span>
          ) : null}
          {status !== undefined ? (
            <span className={`rounded-full px-2 py-0.5 text-[11px] ${OW_STATUS_TONE_CLASS[status.tone]}`}>
              {status.label}
            </span>
          ) : null}
          <span className="text-awc-fg-subtle">{timeLabel}</span>
        </div>
        <div className={`mt-1 ${isSelf ? OW_BUBBLE_SELF_CLASS : OW_BUBBLE_OTHER_CLASS}`}>
          <p className="m-0 whitespace-pre-wrap">{text}</p>
        </div>
      </div>
    </article>
  );
}
