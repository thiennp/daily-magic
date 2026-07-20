"use client";

import MacDeviceIcon from "@/features/agent-witch/macDevices/MacDeviceIcon";
import { APP_SURFACE_CTA_SECONDARY_SM_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { useLinkLocalAgentAccount } from "@/features/home/hooks/useLinkLocalAgentAccount";

interface ConnectThisMacRowProps {
  readonly appOrigin: string;
  readonly onLinked: () => void;
}

export default function ConnectThisMacRow({
  appOrigin,
  onLinked,
}: ConnectThisMacRowProps) {
  const { isLinking, linkError, linkNow } = useLinkLocalAgentAccount({
    appOrigin,
    autoLink: false,
    onLinked,
  });

  return (
    <li>
      <div className="flex w-full items-center gap-3 rounded-lg border border-dashed border-gray-200 bg-gray-50/80 px-3 py-3 dark:border-gray-700 dark:bg-white/[0.02]">
        <MacDeviceIcon className="text-gray-400 dark:text-gray-500" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-900 dark:text-white/90">
            This computer
          </p>
          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
            Link the Mac you are using now to your account.
          </p>
          {linkError !== null ? (
            <p className="mt-2 text-xs text-red-600 dark:text-red-400">
              {linkError}
            </p>
          ) : null}
        </div>
        <button
          type="button"
          className={APP_SURFACE_CTA_SECONDARY_SM_CLASS}
          disabled={isLinking}
          onClick={() => {
            void linkNow();
          }}
        >
          {isLinking ? "Connecting…" : "Connect this Mac"}
        </button>
      </div>
    </li>
  );
}
