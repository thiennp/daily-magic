"use client";

import { useEffect, useState } from "react";

import { PROJECT_PAGE_SETTINGS_COPY as C } from "@/features/projects/projectPageSettingsCopy.constant";
import { requestProjectComputerHistory } from "@/features/projects/utils/requestProjectComputerHistory";

interface AwcProjectSettingsHistoryRowProps {
  readonly projectId: string;
}

/**
 * Message history — read-only switch. Cloud shows Local preference;
 * toggle is configured in AgentWitch Local (toast on click).
 */
export default function AwcProjectSettingsHistoryRow({
  projectId,
}: AwcProjectSettingsHistoryRowProps) {
  const [enabled, setEnabledDisplay] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    void requestProjectComputerHistory({
      projectId,
      signal: controller.signal,
    }).then((result) => {
      if (!controller.signal.aborted && result.ok) {
        setEnabledDisplay(result.enabled);
      }
    });
    return () => controller.abort();
  }, [projectId]);

  const onActivate = (): void => {
    setToast(C.historyToast);
    window.setTimeout(() => setToast(null), 2600);
  };

  return (
    <section className="flex flex-col gap-2" aria-labelledby="p-set-hist-h">
      <h3
        id="p-set-hist-h"
        className="text-[13px] font-semibold text-awc-fg-muted dark:text-gray-400"
      >
        {C.historyHeading}
      </h3>
      <button
        type="button"
        className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm transition-all hover:bg-awc-tile/70 dark:hover:bg-white/10"
        aria-label={C.historyAria}
        onClick={onActivate}
      >
        <span className="min-w-0 flex-1">
          <span className="block font-medium text-awc-fg dark:text-white/90">
            {C.historyTitle}
          </span>
          <span className="mt-0.5 block text-[13px] text-awc-fg-muted dark:text-gray-400">
            {C.historySub}
          </span>
        </span>
        <span
          role="switch"
          aria-checked={enabled}
          aria-hidden="true"
          className={`relative inline-flex h-7 w-[46px] shrink-0 rounded-full transition-colors ${
            enabled
              ? "bg-gray-800 dark:bg-white/80"
              : "bg-gray-200 dark:bg-white/15"
          }`}
        >
          <span
            className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
              enabled ? "translate-x-[18px]" : "translate-x-0.5"
            }`}
          />
        </span>
      </button>
      {toast ? (
        <p
          className="px-3.5 text-[13px] font-medium text-awc-fg dark:text-gray-200"
          role="status"
        >
          {toast}
        </p>
      ) : null}
    </section>
  );
}
