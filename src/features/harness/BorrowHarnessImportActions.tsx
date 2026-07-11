"use client";

import Button from "@/components/ui/button/Button";

interface BorrowHarnessImportActionsProps {
  readonly ownerUserId: string;
  readonly isOnline: boolean;
  readonly activeSetSlugs: readonly string[];
  readonly importStatus: "idle" | "exporting" | "importing" | "done" | "error";
  readonly importMessage: string | null;
  readonly onImport: () => void;
}

export default function BorrowHarnessImportActions({
  isOnline,
  activeSetSlugs,
  importStatus,
  importMessage,
  onImport,
}: BorrowHarnessImportActionsProps) {
  const isBusy = importStatus === "exporting" || importStatus === "importing";

  return (
    <div className="mt-4 space-y-2">
      <Button
        disabled={!isOnline || activeSetSlugs.length === 0 || isBusy}
        onClick={onImport}
      >
        {importStatus === "importing"
          ? "Importing sets…"
          : importStatus === "exporting"
            ? "Requesting export…"
            : "Import to my harness"}
      </Button>
      {!isOnline ? (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Owner must be online with a paired agent to export file contents.
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
