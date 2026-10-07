import { OW_CARD_CLASS } from "@/features/projects/messenger/oneWindow/awcOneWindowChrome.constant";
import { ONE_WINDOW_FEED_COPY } from "@/features/projects/messenger/oneWindow/oneWindowFeedCopy.constant";

export type OneWindowBotToBotLine = {
  readonly who: string;
  readonly to: string;
  readonly text: string;
};

interface AwcOneWindowBotToBotCardProps {
  readonly timeLabel: string;
  readonly lines: readonly OneWindowBotToBotLine[];
}

/** Between-assistants card (OW-H1). */
export default function AwcOneWindowBotToBotCard({
  timeLabel,
  lines,
}: AwcOneWindowBotToBotCardProps) {
  const copy = ONE_WINDOW_FEED_COPY;
  return (
    <article className={OW_CARD_CLASS} aria-label={`${copy.betweenAssistants} at ${timeLabel}`}>
      <div className="mb-2 flex items-center gap-2 text-[12.5px] font-semibold text-awc-fg-subtle">
        {copy.betweenAssistants}
        <span className="font-normal text-awc-fg-subtle">{timeLabel}</span>
      </div>
      <div className="grid gap-2.5">
        {lines.map((line) => (
          <div key={`${line.who}-${line.text.slice(0, 24)}`} className="flex gap-2.5">
            <div
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-awc-tile-2 text-[10px] font-semibold text-awc-fg-muted"
              aria-hidden
            >
              {line.who.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="text-[13px]">
                <b>{line.who}</b>{" "}
                <span className="text-awc-fg-subtle">to {line.to}</span>
              </div>
              <p className="m-0 mt-0.5 text-[13px] text-awc-fg">{line.text}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
