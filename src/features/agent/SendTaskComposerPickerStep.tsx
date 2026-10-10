"use client";

import ProjectLibraryLink from "@/features/agent/ProjectLibraryLink";

import SendTaskComposerPickerRow from "@/features/agent/SendTaskComposerPickerRow";
import { useSendTaskComposerHistoryDelete } from "@/features/agent/hooks/public-api/presentation";
import { useSendTaskComposerHistoryRuns } from "@/features/agent/hooks/public-api/presentation";
import { useSendTaskComposerLibraryDelete } from "@/features/agent/hooks/public-api/presentation";
import { buildSendTaskComposerHistoryPickerItems } from "@/features/agent/utils/buildSendTaskComposerHistoryPickerItems";
import {
  buildSendTaskComposerPickerItems,
  type SendTaskComposerPickerItem,
} from "@/features/agent/utils/buildSendTaskComposerPickerItems";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";

interface SendTaskComposerPickerStepProps {
  readonly capabilities: readonly PublishedCapabilityRecord[];
  readonly isLoading: boolean;
  readonly onSelect: (item: SendTaskComposerPickerItem) => void;
  readonly removeLibraryCapability: (capabilityId: string) => void;
}

export default function SendTaskComposerPickerStep({
  capabilities,
  isLoading,
  onSelect,
  removeLibraryCapability,
}: SendTaskComposerPickerStepProps) {
  const historyRuns = useSendTaskComposerHistoryRuns();
  const historyItems = buildSendTaskComposerHistoryPickerItems(historyRuns);
  const libraryItems = buildSendTaskComposerPickerItems(capabilities);
  const historyDelete = useSendTaskComposerHistoryDelete();
  const libraryDelete = useSendTaskComposerLibraryDelete(
    removeLibraryCapability,
  );
  const isBusy = historyDelete.isDeleting || libraryDelete.isDeleting;

  return (
    <div>
      <h2 className="text-sm font-medium text-awc-fg dark:text-white/90">
        Choose a workflow or continue
      </h2>
      {historyItems.length > 0 ? (
        <div className="mt-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xs font-medium uppercase tracking-wide text-awc-fg-muted dark:text-gray-400">
              Continue from history
            </h3>
            <button
              type="button"
              disabled={isBusy}
              onClick={() => {
                void historyDelete.clearHistory();
              }}
              className="text-xs font-medium text-awc-fg-muted transition hover:text-error-600 disabled:opacity-50 dark:text-gray-400 dark:hover:text-error-400"
            >
              Clear history
            </button>
          </div>
          <ul className="mt-2 space-y-2">
            {historyItems.map((item) => (
              <li key={`history-${item.id}`}>
                <SendTaskComposerPickerRow
                  item={item}
                  onPlay={onSelect}
                  onDelete={(historyItem) => {
                    void historyDelete.deleteHistoryItem(historyItem);
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <div className={historyItems.length > 0 ? "mt-5" : "mt-3"}>
        <h3 className="text-xs font-medium uppercase tracking-wide text-awc-fg-muted dark:text-gray-400">
          Workflows and agents
        </h3>
        {isLoading ? (
          <p className="mt-2 text-sm text-awc-fg-muted dark:text-gray-400">
            Loading your library…
          </p>
        ) : (
          <ul className="mt-2 space-y-2">
            {libraryItems.map((item) => (
              <li key={`${item.itemType}-${item.id}`}>
                <SendTaskComposerPickerRow
                  item={item}
                  onPlay={onSelect}
                  onDelete={
                    item.kind === "library"
                      ? (libraryItem) => {
                          void libraryDelete.deleteLibraryItem(libraryItem);
                        }
                      : undefined
                  }
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      {!isLoading && capabilities.length === 0 ? (
        <p className="mt-3 text-xs text-awc-fg-muted dark:text-gray-400">
          No saved workflows yet. Start a custom task, or{" "}
          <ProjectLibraryLink>open a project&apos;s Library</ProjectLibraryLink>
          .
        </p>
      ) : null}
    </div>
  );
}
