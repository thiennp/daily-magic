import type { DeviceVerifyView } from "@/features/agent-access/device-verify/resolveDeviceVerifyView";
import { DEVICE_VERIFY_STATE_COPY } from "@/features/agent-access/device-verify/deviceVerifyStateCopy.constant";

type DeviceVerifyStatusProps = {
  readonly view: DeviceVerifyView;
};

const toneClass: Record<DeviceVerifyView["tone"], string> = {
  success:
    "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-100",
  error:
    "border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-100",
  info: "border-awc-border bg-awc-surface-2 text-awc-fg dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200",
};

/** Result / error line (announced to screen readers) plus the next step. */
export default function DeviceVerifyStatus({ view }: DeviceVerifyStatusProps) {
  if (view.message === null) return null;
  return (
    <div
      role={view.tone === "error" ? "alert" : "status"}
      aria-live={view.tone === "error" ? "assertive" : "polite"}
      data-tone={view.tone}
      className={`mt-6 rounded-md border px-3 py-2 text-sm ${toneClass[view.tone]}`}
    >
      <p>{view.message}</p>
      {view.showNextStep ? (
        <div className="mt-3" data-next-step>
          <p className="font-semibold">
            {DEVICE_VERIFY_STATE_COPY.nextStepLabel}
          </p>
          <p className="mt-1">{DEVICE_VERIFY_STATE_COPY.nextStep}</p>
        </div>
      ) : null}
    </div>
  );
}
