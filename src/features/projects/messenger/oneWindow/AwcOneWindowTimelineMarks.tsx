import type { Ref } from "react";

import {
  OW_DAY_SEPARATOR_CLASS,
  OW_JUMP_NEW_CLASS,
  OW_NEW_MARKER_CLASS,
} from "@/features/projects/messenger/oneWindow/awcOneWindowChrome.constant";
import { ONE_WINDOW_FEED_COPY } from "@/features/projects/messenger/oneWindow/oneWindowFeedCopy.constant";

/** P1-S4a day separator ("Today · Wed 7 Oct"). */
export function AwcOneWindowDaySeparator({ label }: { readonly label: string }) {
  return (
    <div className={OW_DAY_SEPARATOR_CLASS} role="separator">
      {label}
    </div>
  );
}

/** P1-S4a "New" marker above the first unread message. */
export function AwcOneWindowNewMarker({ markerRef }: { readonly markerRef: Ref<HTMLDivElement> }) {
  return (
    <div ref={markerRef} id="awc-ow-new-marker" className={OW_NEW_MARKER_CLASS} role="separator">
      {ONE_WINDOW_FEED_COPY.newMark}
    </div>
  );
}

/** P1-S4a "{n} new" pill: scrolls the New marker into view. */
export function AwcOneWindowJumpToNew({
  count,
  onJump,
}: {
  readonly count: number;
  readonly onJump: () => void;
}) {
  const copy = ONE_WINDOW_FEED_COPY;
  const label = count === 1 ? copy.jumpNewOne : copy.jumpNewMany.replace("{n}", String(count));
  return (
    <button type="button" className={OW_JUMP_NEW_CLASS} aria-label={copy.jumpNewA11y} onClick={onJump}>
      <span aria-hidden>↓</span>
      {label}
    </button>
  );
}
