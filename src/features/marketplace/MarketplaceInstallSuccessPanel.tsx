"use client";

import Button from "@/components/ui/button/Button";
import AppIcon from "@/components/ui/icon/AppIcon";
import { CheckCircleIcon } from "@/icons";

interface MarketplaceInstallSuccessPanelProps {
  readonly listingName: string;
  readonly message: string;
  readonly canStartTask: boolean;
  readonly onStartTask: () => void;
  readonly onClose: () => void;
}

export default function MarketplaceInstallSuccessPanel({
  listingName,
  message,
  canStartTask,
  onStartTask,
  onClose,
}: MarketplaceInstallSuccessPanelProps) {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success-50 dark:bg-success-500/10">
        <AppIcon
          icon={CheckCircleIcon}
          size="xl"
          className="text-success-600 dark:text-success-400"
        />
      </div>
      <h2 className="mt-5 text-lg font-semibold text-gray-900 dark:text-white/90">
        {listingName} installed
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{message}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {canStartTask ? (
          <Button onClick={onStartTask}>Start a task</Button>
        ) : null}
        <Button variant="outline" onClick={onClose}>
          {canStartTask ? "Not now" : "Close"}
        </Button>
      </div>
    </div>
  );
}
