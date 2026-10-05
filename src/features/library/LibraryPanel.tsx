"use client";

import EmptyStatePanel from "@/features/empty-states/EmptyStatePanel";
import EmptyStatePanelSkeleton from "@/features/empty-states/EmptyStatePanelSkeleton";
import { useGuestSessionState } from "@/features/empty-states/useGuestSessionState";
import LibraryPlaybookCard from "@/features/library/LibraryPlaybookCard";
import useShellNavContext from "@/features/shell/hooks/useShellNavContext";
import { resolveLibrarySignedInEmptyBody } from "@/lib/copy/resolveSoloTeamSurfaceCopy";
import { useLibraryCapabilities } from "@/features/library/hooks/useLibraryCapabilities";
import { buildNavConsolidationNewTaskHref } from "@/lib/shell/buildNavConsolidationNewTaskHref";
import { CapabilityStatus } from "@/lib/capabilities/CapabilityStatus.constant";
import AppPanel from "@/components/surfaces/AppPanel";
import Button from "@/components/ui/button/Button";

interface LibraryPanelProps {
  readonly refreshKey?: number;
  readonly onUpdated?: () => void;
}

export default function LibraryPanel({
  refreshKey = 0,
  onUpdated,
}: LibraryPanelProps) {
  const { sessionState } = useGuestSessionState();
  const { teamNavEnabled } = useShellNavContext();
  const capabilitiesEnabled = sessionState === "signed_in";
  const {
    capabilities,
    isLoading: isCapabilitiesLoading,
    loadFailed,
    reload,
  } = useLibraryCapabilities(refreshKey, capabilitiesEnabled);
  const libraryItems = capabilities.filter(
    (capability) => capability.status !== CapabilityStatus.ARCHIVED,
  );
  const publishedCount = libraryItems.filter(
    (capability) => capability.status === CapabilityStatus.PUBLISHED,
  ).length;

  const isLoading =
    sessionState === "loading" ||
    (sessionState === "signed_in" && isCapabilitiesLoading);

  if (isLoading) {
    return <EmptyStatePanelSkeleton />;
  }

  if (loadFailed) {
    return (
      <AppPanel padding="compact" className="mx-auto w-full max-w-lg">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
            Could not load your library
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Something went wrong while fetching your playbooks. Try again in a
            moment.
          </p>
          <div>
            <Button size="sm" variant="outline" onClick={reload}>
              Try again
            </Button>
          </div>
        </div>
      </AppPanel>
    );
  }

  if (libraryItems.length === 0) {
    return (
      <EmptyStatePanel
        density="page"
        title="No items in your library yet"
        body={resolveLibrarySignedInEmptyBody({ teamNavEnabled })}
        primaryCta={{ label: "Browse Marketplace", href: "/marketplace" }}
        secondaryCta={{
          label: "New task",
          href: buildNavConsolidationNewTaskHref(),
        }}
      />
    );
  }

  return (
    <section className="space-y-4">
      <div className="space-y-3">
        {libraryItems.map((capability) => (
          <LibraryPlaybookCard
            key={capability.id}
            capability={capability}
            onUpdated={onUpdated}
          />
        ))}
      </div>
      {publishedCount === 0 && libraryItems.length > 0 ? (
        <p className="text-sm text-amber-700 dark:text-amber-300">
          Draft playbooks are private until you publish them for teammates.
        </p>
      ) : null}
    </section>
  );
}
