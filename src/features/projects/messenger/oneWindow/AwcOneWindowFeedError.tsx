"use client";

import {
  OW_ILL_CLASS,
  OW_PRIMARY_BUTTON_CLASS,
  OW_STATE_WRAP_CLASS,
} from "@/features/projects/messenger/oneWindow/awcOneWindowChrome.constant";
import { ONE_WINDOW_FEED_COPY } from "@/features/projects/messenger/oneWindow/oneWindowFeedCopy.constant";

interface AwcOneWindowFeedErrorProps {
  readonly onRetry: () => void;
}

/** Error + Try again (EN-PASS). */
export default function AwcOneWindowFeedError({ onRetry }: AwcOneWindowFeedErrorProps) {
  const copy = ONE_WINDOW_FEED_COPY;
  return (
    <div className={OW_STATE_WRAP_CLASS} role="alert">
      <div className="grid max-w-[360px] justify-items-center gap-2.5">
        <div className={`${OW_ILL_CLASS} bg-red-50 text-red-700`} aria-hidden>
          !
        </div>
        <h2 className="m-0 text-[17px] font-semibold text-awc-fg">{copy.errorTitle}</h2>
        <p className="m-0 text-sm text-awc-fg-muted">{copy.errorBody}</p>
        <button type="button" className={OW_PRIMARY_BUTTON_CLASS} onClick={onRetry}>
          {copy.tryAgain}
        </button>
      </div>
    </div>
  );
}
