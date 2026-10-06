"use client";

import type { AskBoxSendTarget } from "@/features/projects/askBox/askBoxSendTarget";
import { PROJECT_ASK_BOX_COPY } from "@/features/projects/askBox/projectAskBoxCopy.constant";
import { PROJECT_MESSAGE_SUMMARY_MAX_CHARS } from "@/lib/projects/acl/messaging/projectMessage.constants";

const SELECT_CHEVRON =
  "bg-[url(\"data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='10'%20height='6'%20fill='none'%3E%3Cpath%20d='M1%201l4%204%204-4'%20stroke='%238e8e93'%20stroke-width='1.6'%20stroke-linecap='round'%20stroke-linejoin='round'/%3E%3C/svg%3E\")] bg-[right_4px_center] bg-no-repeat";

interface AwcProjectAskBoxBarProps {
  readonly disabled: boolean;
  readonly canSend: boolean;
  readonly showCounter: boolean;
  readonly textLength: number;
  readonly to: string;
  readonly targets: readonly AskBoxSendTarget[];
  readonly onTo: (to: string) => void;
  /** Dock owns Send-to chips — hide the inline select. */
  readonly hideSendTo?: boolean;
}

/** Optional Send to pill + 0/200 counter (task mode) + round send button. */
export default function AwcProjectAskBoxBar({
  disabled,
  canSend,
  showCounter,
  textLength,
  to,
  targets,
  onTo,
  hideSendTo = false,
}: AwcProjectAskBoxBarProps) {
  const copy = PROJECT_ASK_BOX_COPY;
  return (
    <div className="flex flex-wrap items-center justify-between gap-2.5">
      <div className="flex min-w-0 flex-wrap items-center gap-2.5">
        {hideSendTo ? null : (
          <label className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 py-1 pl-3 pr-2 text-sm text-gray-500 dark:bg-white/10 dark:text-gray-400">
            {copy.sendTo}
            <select
              aria-label={copy.sendTo}
              value={to}
              disabled={disabled}
              onChange={(event) => {
                onTo(event.target.value);
              }}
              className={`cursor-pointer appearance-none border-0 bg-transparent py-0.5 pl-0 pr-[18px] text-sm font-medium text-gray-900 focus:outline-none dark:text-white ${SELECT_CHEVRON}`}
            >
              {targets.map((target) => (
                <option key={target.key} value={target.key} className="bg-white text-gray-900">
                  {target.label}
                </option>
              ))}
            </select>
          </label>
        )}
        {showCounter ? (
          <span className="text-[12.5px] tabular-nums text-gray-500 dark:text-gray-400">
            {copy.counter(textLength, PROJECT_MESSAGE_SUMMARY_MAX_CHARS)}
          </span>
        ) : null}
      </div>
      <button
        type="submit"
        aria-label={copy.send}
        disabled={disabled || !canSend}
        className="grid h-9 w-9 flex-none place-items-center rounded-full bg-gray-900 text-white transition hover:bg-gray-800 disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400/40 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
