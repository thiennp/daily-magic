import {
  OW_ILL_CLASS,
  OW_STATE_WRAP_CLASS,
} from "@/features/projects/messenger/oneWindow/awcOneWindowChrome.constant";
import { ONE_WINDOW_FEED_COPY } from "@/features/projects/messenger/oneWindow/oneWindowFeedCopy.constant";

/** project_required gate copy (locked). */
export default function AwcOneWindowProjectRequired() {
  const copy = ONE_WINDOW_FEED_COPY;
  return (
    <div className={`${OW_STATE_WRAP_CLASS} bg-awc-surface`}>
      <div className="grid max-w-[360px] justify-items-center gap-2.5">
        <div className={OW_ILL_CLASS} aria-hidden>
          ⌂
        </div>
        <h2 className="m-0 text-[17px] font-semibold text-awc-fg">
          {copy.projectRequiredTitle}
        </h2>
        <p className="m-0 text-sm text-awc-fg-muted">{copy.projectRequired}</p>
      </div>
    </div>
  );
}
