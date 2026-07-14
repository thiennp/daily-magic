"use client";

import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import WsTestComposerHelperText from "@/features/agent/WsTestComposerHelperText";
import type { WsTestConnectionStatus } from "@/features/agent/types/WsTestConnectionStatus.type";

interface WsTestComposerActionsProps {
  readonly connectionStatus: WsTestConnectionStatus;
  readonly isSendDisabled: boolean;
  readonly canCopyPrompt: boolean;
  readonly canQueue: boolean;
  readonly copyText: string;
  readonly sendLabel: string;
  readonly isWorkflowTask: boolean;
  readonly isTeamDispatch: boolean;
  readonly hasOnlineMac: boolean;
  readonly selectedDeviceIsOnline: boolean;
  readonly onSend: () => void;
  readonly onClear: () => void;
  readonly onQueue: () => void;
}

const primaryButtonClass =
  "inline-flex h-11 items-center justify-center rounded-lg bg-brand-500 px-5 text-sm font-medium text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50";
const outlineButtonClass =
  "inline-flex h-11 items-center justify-center rounded-lg border border-gray-200 px-5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5";

export default function WsTestComposerActions({
  connectionStatus,
  isSendDisabled,
  canCopyPrompt,
  canQueue,
  copyText,
  sendLabel,
  isWorkflowTask,
  isTeamDispatch,
  hasOnlineMac,
  selectedDeviceIsOnline,
  onSend,
  onClear,
  onQueue,
}: WsTestComposerActionsProps) {
  const isBrowserOffline = connectionStatus !== "connected";
  const { copied, copy } = useCopyToClipboard();

  const handleCopy = () => {
    void copy(copyText);
  };

  return (
    <>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onSend}
          disabled={isSendDisabled}
          className={`${primaryButtonClass} min-w-[10rem] flex-1 sm:flex-none`}
        >
          {sendLabel}
        </button>
        {canCopyPrompt ? (
          <button
            type="button"
            onClick={handleCopy}
            className={`${outlineButtonClass} flex-1 sm:flex-none`}
          >
            {copied ? "Copied" : "Copy for other AI"}
          </button>
        ) : null}
        {isBrowserOffline && canQueue ? (
          <button
            type="button"
            onClick={onQueue}
            className={`${outlineButtonClass} flex-1 sm:flex-none`}
          >
            Queue for later
          </button>
        ) : null}
        <button type="button" onClick={onClear} className={outlineButtonClass}>
          Clear
        </button>
      </div>
      <WsTestComposerHelperText
        isSendDisabled={isSendDisabled}
        isWorkflowTask={isWorkflowTask}
        isBrowserOffline={isBrowserOffline}
        canCopyPrompt={canCopyPrompt}
        isTeamDispatch={isTeamDispatch}
        hasOnlineMac={hasOnlineMac}
        selectedDeviceIsOnline={selectedDeviceIsOnline}
      />
    </>
  );
}
