"use client";

import Button from "@/components/ui/button/Button";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";

const TYPE_LABEL_MAP: Record<HarnessMarketplaceListing["type"], string> = {
  [CapabilityType.AGENT]: "Agent",
  [CapabilityType.WORKFLOW]: "Workflow",
};

interface HarnessMarketplaceListProps {
  readonly listings: readonly HarnessMarketplaceListing[];
  readonly isLoading: boolean;
  readonly onBorrow: (capabilityId: string) => void;
}

export default function HarnessMarketplaceList({
  listings,
  isLoading,
  onBorrow,
}: HarnessMarketplaceListProps) {
  if (isLoading) {
    return (
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Loading marketplace…
      </p>
    );
  }

  if (listings.length === 0) {
    return (
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        No agents or workflows with linked harness bundles are available yet.
        Teammates must publish a capability and link a harness set.
      </p>
    );
  }

  return (
    <div className="mt-4 space-y-3">
      {listings.map((listing) => (
        <article
          key={listing.capabilityId}
          className="rounded-xl border border-gray-200 p-4 dark:border-gray-800"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-950/40 dark:text-brand-300">
                  {TYPE_LABEL_MAP[listing.type]}
                </span>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {listing.name}
                </p>
              </div>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {listing.description}
              </p>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                {listing.ownerName ?? listing.ownerEmail}
                {listing.harnessSetName
                  ? ` · bundle: ${listing.harnessSetName}`
                  : ` · bundle: ${listing.harnessSetSlug}`}
                {listing.harnessItemCount !== null
                  ? ` · ${listing.harnessItemCount} items`
                  : ""}
                {listing.isOnline ? " · owner online" : " · snapshot only"}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => onBorrow(listing.capabilityId)}
            >
              Preview & borrow
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}
