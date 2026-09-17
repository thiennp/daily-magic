"use client";

import EmptyStatePanel from "@/features/empty-states/EmptyStatePanel";
import EmptyStatePanelSkeleton from "@/features/empty-states/EmptyStatePanelSkeleton";
import {
  CREATE_FREE_ACCOUNT_HREF,
  buildSignInHref,
} from "@/features/empty-states/buildGuestAuthHrefs";
import { LIBRARY_GUEST_EMPTY_COPY } from "@/features/empty-states/signedOutPageEmptyCopy.constant";
import { useGuestSessionState } from "@/features/empty-states/useGuestSessionState";
import LibraryPlaybookCard from "@/features/library/LibraryPlaybookCard";
import useShellNavContext from "@/features/shell/hooks/useShellNavContext";
import { resolveLibrarySignedInEmptyBody } from "@/lib/copy/resolveSoloTeamSurfaceCopy";
import { useLibraryCapabilities } from "@/features/library/hooks/useLibraryCapabilities";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";
import { CapabilityStatus } from "@/lib/capabilities/CapabilityStatus.constant";

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
  const { capabilities, isLoading: isCapabilitiesLoading } =
    useLibraryCapabilities(refreshKey, capabilitiesEnabled);
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

  if (sessionState === "guest") {
    return (
      <EmptyStatePanel
        density="section"
        title={LIBRARY_GUEST_EMPTY_COPY.title}
        body="Your saved workflows live here after you create an account. Browse starters on Marketplace, or start from a New task."
        primaryCta={{
          label: LIBRARY_GUEST_EMPTY_COPY.primaryCtaLabel,
          href: CREATE_FREE_ACCOUNT_HREF,
        }}
        secondaryCta={{
          label: LIBRARY_GUEST_EMPTY_COPY.secondaryCtaLabel,
          href: buildSignInHref("/library"),
        }}
        tertiaryLink={{ label: "Browse Marketplace", href: "/marketplace" }}
      />
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
          href: buildAgentComposerHref({ customTask: true }),
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
