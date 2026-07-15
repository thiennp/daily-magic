"use client";

import Button from "@/components/ui/button/Button";

interface BorrowHarnessImportActionsProps {
  readonly isOnline: boolean;
  readonly isOfficialPreset?: boolean;
  readonly macConnected?: boolean;
  readonly activeSetSlugs: readonly string[];
  readonly importStatus: "idle" | "exporting" | "importing" | "done" | "error";
  readonly importMessage: string | null;
  readonly onImport: () => void;
}

export default function BorrowHarnessImportActions({
  isOnline,
  isOfficialPreset = false,
  macConnected = false,
  activeSetSlugs,
  importStatus,
  importMessage,
  onImport,
}: BorrowHarnessImportActionsProps) {
  const canInstall = isOfficialPreset ? macConnected : isOnline;
  const isBusy = importStatus === "exporting" || importStatus === "importing";

  return (
    <div className="mt-4 space-y-2">
      <Button
        disabled={!canInstall || activeSetSlugs.length === 0 || isBusy}
        onClick={onImport}
      >
        {importStatus === "importing"
          ? "Importing bundle…"
          : importStatus === "exporting"
            ? "Requesting export…"
            : "Install bundle"}
      </Button>
      {!canInstall ? (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {isOfficialPreset
            ? "Connect Agent Witch on your Mac to install this rules bundle."
            : "Owner must be online with a connected Mac to export files."}
        </p>
      ) : null}
      {importMessage ? (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {importMessage}
        </p>
      ) : null}
    </div>
  );
}
