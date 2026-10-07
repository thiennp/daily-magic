"use client";

interface SendTaskModalChromeProps {
  readonly titleId: string;
  readonly isExpanded: boolean;
  readonly onClose: () => void;
  readonly onExpand: () => void;
  readonly onMinimize: () => void;
}

export default function SendTaskModalChrome({
  titleId,
  isExpanded,
  onClose,
  onExpand,
  onMinimize,
}: SendTaskModalChromeProps) {
  if (!isExpanded) {
    return (
      <div className="flex items-center justify-between gap-2 border-b border-awc-border px-3 py-2 dark:border-gray-700">
        <p className="truncate text-sm font-medium text-awc-fg dark:text-white/90">
          Task on your computer
        </p>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            className="rounded-lg px-2 py-1 text-xs font-medium text-brand-700 hover:bg-brand-50 dark:text-brand-300 dark:hover:bg-brand-950/40"
            onClick={onExpand}
          >
            Expand
          </button>
          <button
            type="button"
            aria-label="Close New task dialog"
            className="rounded-lg px-2 py-1 text-xs text-awc-fg-muted hover:bg-awc-tile dark:hover:bg-gray-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="pr-20">
        <h2
          id={titleId}
          className="text-lg font-semibold text-awc-fg dark:text-white/90"
        >
          New task
        </h2>
        <p className="mt-1 text-sm text-awc-fg-muted dark:text-gray-400">
          Choose a computer, confirm the active project, pick a workflow or
          agent, then describe what should run.
        </p>
      </div>
      <div className="absolute right-3 top-3 z-20 flex items-center gap-1 sm:right-6 sm:top-6">
        <button
          type="button"
          aria-label="Minimize New task dialog"
          className="flex h-9.5 w-9.5 items-center justify-center rounded-full bg-awc-fill text-awc-fg-muted hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 sm:h-11 sm:w-11"
          onClick={onMinimize}
        >
          <span aria-hidden className="block h-0.5 w-3.5 rounded bg-current" />
        </button>
        <button
          type="button"
          aria-label="Close New task dialog"
          className="flex h-9.5 w-9.5 items-center justify-center rounded-full bg-awc-fill text-awc-fg-subtle hover:bg-gray-200 hover:text-awc-fg dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white sm:h-11 sm:w-11"
          onClick={onClose}
        >
          <span aria-hidden className="text-lg leading-none">
            ×
          </span>
        </button>
      </div>
    </>
  );
}
