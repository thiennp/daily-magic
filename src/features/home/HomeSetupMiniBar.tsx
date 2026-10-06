"use client";

import AppPanel from "@/components/surfaces/AppPanel";
import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_CTA_SECONDARY_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";

interface HomeSetupMiniBarProps {
  readonly done: number;
  readonly total: number;
  readonly allDone: boolean;
  readonly onShow: () => void;
}

/** Collapsed Setup strip (design setup-mini). */
export default function HomeSetupMiniBar({
  done,
  total,
  allDone,
  onShow,
}: HomeSetupMiniBarProps) {
  return (
    <AppPanel as="section" aria-label="Setup" className="!py-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-gray-800 dark:text-white/90">
          <span className="font-semibold">Setup</span>{" "}
          {allDone ? (
            <span className="ml-2 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100">
              All done
            </span>
          ) : (
            <span className={`ml-2 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
              {done} of {total} done
            </span>
          )}
        </p>
        <button
          type="button"
          className={APP_SURFACE_CTA_SECONDARY_CLASS}
          onClick={onShow}
        >
          Show
        </button>
      </div>
    </AppPanel>
  );
}
