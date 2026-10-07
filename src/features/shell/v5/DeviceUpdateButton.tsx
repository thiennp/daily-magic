"use client";

import {
  APP_SHELL_V5_PILL_BUTTON_CLASS,
} from "@/features/shell/v5/appShellV5Classes.constant";
import type { DeviceUpdateAction } from "@/features/shell/v5/resolveDeviceUpdateAction";

interface DeviceUpdateButtonProps {
  readonly action: DeviceUpdateAction;
  readonly onUpdate?: () => void;
}

const BADGE_CLASS =
  "inline-flex items-center gap-1 rounded-full bg-[#f2e4cf] px-1.5 py-0.5 text-[11.5px] font-semibold text-[#7a4410] dark:bg-warning-500/20 dark:text-warning-400";

/**
 * HN-H3 Computers Update: amber badge while offline/remote; filled outline
 * button only when this computer is online and behind.
 */
export default function DeviceUpdateButton({
  action,
  onUpdate,
}: DeviceUpdateButtonProps) {
  if (action.kind === "hidden") {
    return null;
  }

  if (action.kind === "badge") {
    return (
      <div className="mt-1.5 px-3">
        <span className={BADGE_CLASS}>{action.label}</span>
      </div>
    );
  }

  if (action.kind === "disabled") {
    return (
      <div className="mt-1.5 px-3">
        <span className={BADGE_CLASS}>{action.label}</span>
      </div>
    );
  }

  return (
    <div className="mt-2 flex flex-col items-start gap-1 px-3">
      <button
        type="button"
        className={APP_SHELL_V5_PILL_BUTTON_CLASS}
        onClick={onUpdate}
      >
        {action.label}
      </button>
    </div>
  );
}
