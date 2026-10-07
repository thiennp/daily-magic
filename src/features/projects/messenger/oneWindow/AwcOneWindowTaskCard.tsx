import {
  OW_CARD_CLASS,
  OW_SECONDARY_BUTTON_CLASS,
  OW_STATUS_TONE_CLASS,
} from "@/features/projects/messenger/oneWindow/awcOneWindowChrome.constant";
import { ONE_WINDOW_FEED_COPY } from "@/features/projects/messenger/oneWindow/oneWindowFeedCopy.constant";

interface AwcOneWindowTaskCardProps {
  readonly title: string;
  readonly statusLabel: string;
  readonly statusTone?: "ok" | "warn" | "info";
  readonly timeLabel: string;
  readonly subtitle: string;
  readonly done?: number;
  readonly of?: number;
  readonly onOpenTask?: () => void;
}

/** Task card row (OW-H1 presentational; OW-H5 binds live subject state). */
export default function AwcOneWindowTaskCard({
  title,
  statusLabel,
  statusTone = "info",
  timeLabel,
  subtitle,
  done,
  of,
  onOpenTask,
}: AwcOneWindowTaskCardProps) {
  const copy = ONE_WINDOW_FEED_COPY;
  const tone = OW_STATUS_TONE_CLASS[statusTone];
  const pct =
    typeof done === "number" && typeof of === "number" && of > 0
      ? Math.round((done / of) * 100)
      : null;
  return (
    <article className={OW_CARD_CLASS} aria-label={`Task: ${title}`}>
      <div className="mb-1.5 flex flex-wrap items-center gap-2 text-[12.5px]">
        <span className="font-semibold uppercase tracking-wide text-awc-fg-subtle">
          {copy.kindTask}
        </span>
        <span className={`rounded-full px-2 py-0.5 ${tone}`}>{statusLabel}</span>
        <span className="ml-auto text-awc-fg-subtle">{timeLabel}</span>
      </div>
      <h3 className="m-0 text-[15px] font-semibold text-awc-fg">{title}</h3>
      <p className="mt-1 text-[13px] text-awc-fg-muted">{subtitle}</p>
      {pct !== null ? (
        <div
          className="mt-2 h-1.5 overflow-hidden rounded-full bg-awc-tile-2"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={of}
          aria-valuenow={done}
          aria-label="Progress"
        >
          <i className="block h-full bg-awc-primary" style={{ width: `${pct}%` }} />
        </div>
      ) : null}
      {onOpenTask !== undefined ? (
        <div className="mt-2.5">
          <button type="button" className={OW_SECONDARY_BUTTON_CLASS} onClick={onOpenTask}>
            {copy.openTask}
          </button>
        </div>
      ) : null}
    </article>
  );
}
