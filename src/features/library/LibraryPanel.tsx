"use client";

import LibraryPlaybookCard from "@/features/library/LibraryPlaybookCard";
import { useLibraryCapabilities } from "@/features/library/hooks/useLibraryCapabilities";
import { CapabilityStatus } from "@/lib/capabilities/CapabilityStatus.constant";

interface LibraryPanelProps {
  readonly refreshKey?: number;
  readonly onUpdated?: () => void;
}

export default function LibraryPanel({
  refreshKey = 0,
  onUpdated,
}: LibraryPanelProps) {
  const { capabilities, isLoading } = useLibraryCapabilities(refreshKey);
  const libraryItems = capabilities.filter(
    (capability) => capability.status !== CapabilityStatus.ARCHIVED,
  );
  const publishedCount = libraryItems.filter(
    (capability) => capability.status === CapabilityStatus.PUBLISHED,
  ).length;

  return (
    <section className="space-y-4">
      {isLoading ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Loading your library…
        </p>
      ) : libraryItems.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No playbooks yet. Save one from Marketplace or publish your own
          workflow above.
        </p>
      ) : (
        <div className="space-y-3">
          {libraryItems.map((capability) => (
            <LibraryPlaybookCard
              key={capability.id}
              capability={capability}
              onUpdated={onUpdated}
            />
          ))}
        </div>
      )}
      {!isLoading && publishedCount === 0 && libraryItems.length > 0 ? (
        <p className="text-sm text-amber-700 dark:text-amber-300">
          Draft playbooks are private until you publish them for teammates.
        </p>
      ) : null}
    </section>
  );
}
