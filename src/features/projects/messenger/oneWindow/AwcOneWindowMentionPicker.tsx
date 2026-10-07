import {
  OW_MENTION_OPTION_CLASS,
  OW_MENTION_PICKER_CLASS,
} from "@/features/projects/messenger/oneWindow/awcOneWindowChrome.constant";
import { ONE_WINDOW_COMPOSER_COPY } from "@/features/projects/messenger/oneWindow/oneWindowComposerCopy.constant";
import type { OneWindowMentionAssistant } from "@/features/projects/messenger/oneWindow/oneWindowMentions";

interface AwcOneWindowMentionPickerProps {
  readonly options: readonly OneWindowMentionAssistant[];
  readonly active: number;
  readonly onPick: (name: string) => void;
}

/** P1-S4b inline @ picker: project assistants (design "mpick" listbox). */
export default function AwcOneWindowMentionPicker({
  options,
  active,
  onPick,
}: AwcOneWindowMentionPickerProps) {
  const copy = ONE_WINDOW_COMPOSER_COPY;
  return (
    <div id="awc-ow-mention-picker" className={OW_MENTION_PICKER_CLASS} role="listbox" aria-label={copy.mentionList}>
      <div className="px-2 py-1 text-[11.5px] font-semibold uppercase text-awc-fg-subtle" role="presentation">
        {options.length === 0 ? copy.mentionNoMatch : copy.mentionGroupAssistants}
      </div>
      {options.map((option, index) => (
        <div
          key={option.membershipId}
          id={`awc-ow-mention-${index}`}
          role="option"
          aria-selected={index === active}
          className={OW_MENTION_OPTION_CLASS}
          onMouseDown={(event) => {
            event.preventDefault();
            onPick(option.displayName);
          }}
        >
          <span className="grid h-6 w-6 place-items-center rounded-full bg-awc-tile-2 text-[10px] font-semibold text-awc-fg-muted" aria-hidden>
            {option.displayName.slice(0, 2).toUpperCase()}
          </span>
          <span>{option.displayName}</span>
        </div>
      ))}
    </div>
  );
}
