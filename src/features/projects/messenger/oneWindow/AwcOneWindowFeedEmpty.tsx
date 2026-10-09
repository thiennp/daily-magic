import {
  OW_ILL_CLASS,
  OW_STATE_WRAP_CLASS,
} from "@/features/projects/messenger/oneWindow/awcOneWindowChrome.constant";
import type { OneWindowFeedFilter } from "@/features/projects/messenger/oneWindow/AwcOneWindowFilterBar";
import { resolveOneWindowEmptyCopy } from "@/features/projects/messenger/oneWindow/oneWindowFeedEmptyCopy";

/** Empty feed for the active filter — title once (soft needle: do not repeat it in the body). */
export default function AwcOneWindowFeedEmpty({
  filter = "all",
}: {
  readonly filter?: OneWindowFeedFilter;
}) {
  const copy = resolveOneWindowEmptyCopy(filter);
  return (
    <div className={OW_STATE_WRAP_CLASS}>
      <div className="grid max-w-[360px] justify-items-center gap-2.5">
        <div className={OW_ILL_CLASS} aria-hidden>
          ✉
        </div>
        <h2 className="m-0 text-[17px] font-semibold text-awc-fg">
          {copy.title}
        </h2>
        <p className="m-0 text-sm text-awc-fg-muted">{copy.body}</p>
      </div>
    </div>
  );
}
