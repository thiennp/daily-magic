"use client";

import { APP_SURFACE_CTA_PRIMARY_SM_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import MacDeviceIcon from "@/features/agent-witch/macDevices/MacDeviceIcon";
import { resolveMacDeviceIconClassName } from "@/features/agent-witch/macDevices/utils/resolveMacDeviceIconClassName";
import ConnectThisMacButton from "@/features/home/ConnectThisMacButton";
import { APP_SHELL_COMPUTERS_COPY } from "@/features/shell/v5/public-api/types";

interface ConnectThisMacRowProps {
  readonly installCommand: string;
  readonly isWebSocketSupported: boolean;
  readonly host: string;
}

export default function ConnectThisMacRow({
  installCommand,
  isWebSocketSupported,
  host,
}: ConnectThisMacRowProps) {
  return (
    <li>
      <div className="rounded-lg border border-dashed border-awc-border bg-awc-surface-2/80 px-3 py-3 dark:border-gray-700 dark:bg-white/[0.02]">
        <div className="flex flex-col gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <MacDeviceIcon
              className={resolveMacDeviceIconClassName(
                false,
                "mt-0.5 h-4 w-4 shrink-0",
              )}
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-awc-fg dark:text-white/90">
                {APP_SHELL_COMPUTERS_COPY.thisComputer}
              </p>
              <p className="mt-0.5 text-xs text-awc-fg-muted dark:text-gray-400">
                Link the computer you are using now to your account.
              </p>
            </div>
          </div>
          <ConnectThisMacButton
            installCommand={installCommand}
            isWebSocketSupported={isWebSocketSupported}
            host={host}
            fullWidth
            className={`${APP_SURFACE_CTA_PRIMARY_SM_CLASS} w-full`}
          />
        </div>
      </div>
    </li>
  );
}
