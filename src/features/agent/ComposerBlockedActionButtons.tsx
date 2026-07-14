"use client";

import type { ComposerBlockedAction } from "@/features/agent/utils/composerBlockedAction.types";

interface ComposerBlockedActionButtonsProps {
  readonly blockedAction: ComposerBlockedAction;
  readonly isSendDisabled: boolean;
  readonly sendLabel: string;
  readonly copied: boolean;
  readonly onSend: () => void;
  readonly onClear: () => void;
  readonly onCopy: () => void;
  readonly onQueue: () => void;
  readonly onUseOnlineMac: () => void;
  readonly onRetryDevices: () => void;
}

const primaryButtonClass =
  "inline-flex h-11 items-center justify-center rounded-lg bg-brand-500 px-5 text-sm font-medium text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50";
const outlineButtonClass =
  "inline-flex h-11 items-center justify-center rounded-lg border border-gray-200 px-5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5";

export default function ComposerBlockedActionButtons({
  blockedAction,
  isSendDisabled,
  sendLabel,
  copied,
  onSend,
  onClear,
  onCopy,
  onQueue,
  onUseOnlineMac,
  onRetryDevices,
}: ComposerBlockedActionButtonsProps) {
  return (
    <div className="mt-4 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={onSend}
        disabled={isSendDisabled}
        className={`${primaryButtonClass} min-w-[10rem] flex-1 sm:flex-none`}
      >
        {sendLabel}
      </button>
      {blockedAction.showCopy ? (
        <button
          type="button"
          onClick={onCopy}
          className={`${outlineButtonClass} flex-1 sm:flex-none`}
        >
          {copied ? "Copied" : "Copy for other AI"}
        </button>
      ) : null}
      {blockedAction.showQueue ? (
        <button
          type="button"
          onClick={onQueue}
          className={`${outlineButtonClass} flex-1 sm:flex-none`}
        >
          Queue for later
        </button>
      ) : null}
      {blockedAction.showUseOnlineMac ? (
        <button
          type="button"
          onClick={onUseOnlineMac}
          className={`${outlineButtonClass} flex-1 sm:flex-none`}
        >
          Use online Mac
        </button>
      ) : null}
      {blockedAction.showRetryDevices ? (
        <button
          type="button"
          onClick={onRetryDevices}
          className={`${outlineButtonClass} flex-1 sm:flex-none`}
        >
          Retry Mac list
        </button>
      ) : null}
      <button type="button" onClick={onClear} className={outlineButtonClass}>
        Clear
      </button>
    </div>
  );
}
