"use client";

import Link from "next/link";

import SendTaskComposerPickerRow from "@/features/agent/SendTaskComposerPickerRow";
import {
  buildSendTaskComposerPickerItems,
  type SendTaskComposerPickerItem,
} from "@/features/agent/utils/buildSendTaskComposerPickerItems";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";

interface SendTaskComposerPickerStepProps {
  readonly capabilities: readonly PublishedCapabilityRecord[];
  readonly isLoading: boolean;
  readonly onSelect: (item: SendTaskComposerPickerItem) => void;
}

export default function SendTaskComposerPickerStep({
  capabilities,
  isLoading,
  onSelect,
}: SendTaskComposerPickerStepProps) {
  const items = buildSendTaskComposerPickerItems(capabilities);

  return (
    <div>
      <h2 className="text-sm font-medium text-gray-800 dark:text-white/90">
        Choose a workflow or agent
      </h2>
      {isLoading ? (
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          Loading your library…
        </p>
      ) : (
        <ul className="mt-3 space-y-2">
          {items.map((item) => (
            <li key={`${item.itemType}-${item.id}`}>
              <SendTaskComposerPickerRow item={item} onPlay={onSelect} />
            </li>
          ))}
        </ul>
      )}
      {!isLoading && capabilities.length === 0 ? (
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          No saved workflows yet. Pick an AI on your Mac or start a custom task,
          or{" "}
          <Link href="/library" className="text-brand-700 dark:text-brand-300">
            open Library
          </Link>
          .
        </p>
      ) : null}
    </div>
  );
}
