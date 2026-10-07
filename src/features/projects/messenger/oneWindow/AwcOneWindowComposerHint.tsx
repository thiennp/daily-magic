import { ONE_WINDOW_COMPOSER_COPY } from "@/features/projects/messenger/oneWindow/oneWindowComposerCopy.constant";

/** P1-S4b hint row: keys, and "Each @ assigns one task." unless SINGLE. */
export default function AwcOneWindowComposerHint({ single }: { readonly single: boolean }) {
  const copy = ONE_WINDOW_COMPOSER_COPY;
  return (
    <p className="m-0 flex flex-wrap items-center gap-1.5 text-[12px] text-awc-fg-subtle">
      <span>{copy.hintKeys}</span>
      {single ? null : (
        <span title={copy.hintEachAtTip} data-each-at-hint>
          {copy.hintEachAt}
        </span>
      )}
    </p>
  );
}
