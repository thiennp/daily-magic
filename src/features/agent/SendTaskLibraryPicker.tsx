"use client";

import Link from "next/link";

import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";

interface SendTaskLibraryPickerProps {
  readonly capabilities: readonly PublishedCapabilityRecord[];
  readonly selectedCapabilityId: string;
  readonly isLoading: boolean;
  readonly onSelect: (capabilityId: string) => void;
}

const formatLibraryOptionLabel = (
  capability: PublishedCapabilityRecord,
): string => {
  const typeLabel =
    capability.type === CapabilityType.WORKFLOW ? "Workflow" : "Agent";

  return `${typeLabel} · ${capability.name}`;
};

export default function SendTaskLibraryPicker({
  capabilities,
  selectedCapabilityId,
  isLoading,
  onSelect,
}: SendTaskLibraryPickerProps) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-800 dark:text-white/90">
        Saved workflow or agent
        <select
          value={selectedCapabilityId}
          disabled={isLoading}
          onChange={(event) => {
            onSelect(event.target.value);
          }}
          className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
        >
          <option value="">Custom task</option>
          {capabilities.map((capability) => (
            <option key={capability.id} value={capability.id}>
              {formatLibraryOptionLabel(capability)}
            </option>
          ))}
        </select>
      </label>
      {isLoading ? (
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Loading your library…
        </p>
      ) : null}
      {!isLoading && capabilities.length === 0 ? (
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          No saved items yet.{" "}
          <Link
            href="/library"
            className="text-brand-700 dark:text-brand-300"
          >
            Open Library
          </Link>{" "}
          or save one from Marketplace.
        </p>
      ) : null}
    </div>
  );
}
