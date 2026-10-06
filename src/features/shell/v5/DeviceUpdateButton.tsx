"use client";

import { useId } from "react";

import {
  APP_SHELL_V5_PILL_BUTTON_CLASS,
  APP_SHELL_V5_REASON_CLASS,
} from "@/features/shell/v5/appShellV5Classes.constant";
import { APP_SHELL_COMPUTERS_COPY } from "@/features/shell/v5/appShellComputersCopy.constant";
import type { DeviceUpdateAction } from "@/features/shell/v5/resolveDeviceUpdateAction";

interface DeviceUpdateButtonProps {
  readonly action: DeviceUpdateAction;
  readonly onUpdate?: () => void;
}

/**
 * Computers row Update (V5-2). Disabled uses the V5-1 `.awc-disabled`
 * primitive and keeps its reason visible (not hover-only) via
 * aria-describedby + title (#29).
 */
export default function DeviceUpdateButton({
  action,
  onUpdate,
}: DeviceUpdateButtonProps) {
  const reasonId = useId();

  if (action.kind === "hidden") {
    return null;
  }

  const isDisabled = action.kind === "disabled";

  return (
    <div className="mt-2 flex flex-col items-start gap-1 px-3">
      <button
        type="button"
        disabled={isDisabled}
        aria-disabled={isDisabled ? true : undefined}
        aria-describedby={isDisabled ? reasonId : undefined}
        title={isDisabled ? action.reason : undefined}
        className={`${APP_SHELL_V5_PILL_BUTTON_CLASS}${isDisabled ? " awc-disabled" : ""}`}
        onClick={isDisabled ? undefined : onUpdate}
      >
        {APP_SHELL_COMPUTERS_COPY.update}
      </button>
      {isDisabled ? (
        <p id={reasonId} className={APP_SHELL_V5_REASON_CLASS}>
          {action.reason}
        </p>
      ) : null}
    </div>
  );
}
