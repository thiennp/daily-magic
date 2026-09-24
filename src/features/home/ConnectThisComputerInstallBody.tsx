"use client";

import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import CopyableBashCommand from "@/features/home/CopyableBashCommand";

interface ConnectThisComputerInstallBodyProps {
  readonly description: string;
  readonly installCommand: string;
  readonly isInstallCommandLoading: boolean;
  readonly onInstallEngaged: () => void;
}

export default function ConnectThisComputerInstallBody({
  description,
  installCommand,
  isInstallCommandLoading,
  onInstallEngaged,
}: ConnectThisComputerInstallBodyProps) {
  return (
    <>
      <p className={`mt-3 ${APP_SURFACE_BODY_TEXT_CLASS}`}>{description}</p>
      {isInstallCommandLoading ? (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Preparing your install command…
        </p>
      ) : (
        <CopyableBashCommand
          command={installCommand}
          variant="bash"
          onEngaged={onInstallEngaged}
        />
      )}
    </>
  );
}
