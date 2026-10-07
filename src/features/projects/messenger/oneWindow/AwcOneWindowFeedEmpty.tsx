import {
  OW_ILL_CLASS,
  OW_STATE_WRAP_CLASS,
} from "@/features/projects/messenger/oneWindow/awcOneWindowChrome.constant";
import { ONE_WINDOW_FEED_COPY } from "@/features/projects/messenger/oneWindow/oneWindowFeedCopy.constant";

/** Empty feed — title once (soft needle: do not repeat emptyTitle in body). */
export default function AwcOneWindowFeedEmpty() {
  const copy = ONE_WINDOW_FEED_COPY;
  return (
    <div className={OW_STATE_WRAP_CLASS}>
      <div className="grid max-w-[360px] justify-items-center gap-2.5">
        <div className={OW_ILL_CLASS} aria-hidden>
          ✉
        </div>
        <h2 className="m-0 text-[17px] font-semibold text-awc-fg">{copy.emptyTitle}</h2>
        <p className="m-0 text-sm text-awc-fg-muted">{copy.emptyBody}</p>
      </div>
    </div>
  );
}
