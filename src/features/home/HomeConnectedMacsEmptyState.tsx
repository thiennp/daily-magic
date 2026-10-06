"use client";

import ConnectAnotherMacButton from "@/features/home/ConnectAnotherMacButton";
import { APP_SHELL_COMPUTERS_COPY } from "@/features/shell/v5/appShellComputersCopy.constant";

interface HomeConnectedMacsEmptyStateProps {
  readonly installCommand: string;
  readonly isWebSocketSupported: boolean;
  readonly host: string;
}

export default function HomeConnectedMacsEmptyState({
  installCommand,
  isWebSocketSupported,
  host,
}: HomeConnectedMacsEmptyStateProps) {
  return (
    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
      {APP_SHELL_COMPUTERS_COPY.empty}{" "}
      <ConnectAnotherMacButton
        installCommand={installCommand}
        isWebSocketSupported={isWebSocketSupported}
        host={host}
        hasExistingDevices={false}
        className="font-medium text-brand-700 hover:underline dark:text-brand-300"
      />
    </p>
  );
}
