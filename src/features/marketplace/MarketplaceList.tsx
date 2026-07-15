"use client";

import Button from "@/components/ui/button/Button";
import { APP_SURFACE_NESTED_CARD_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";

const TYPE_LABEL_MAP: Record<HarnessMarketplaceListing["type"], string> = {
  [CapabilityType.AGENT]: "Agent",
  [CapabilityType.WORKFLOW]: "Workflow",
};

interface MarketplaceListProps {
  readonly listings: readonly HarnessMarketplaceListing[];
  readonly isLoading: boolean;
  readonly onInstall: (listing: HarnessMarketplaceListing) => void;
  readonly emptyMessage?: string;
}

export default function MarketplaceList({
  listings,
  isLoading,
  onInstall,
  emptyMessage = "No listings yet.",
}: MarketplaceListProps) {
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
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
      {listings.map((listing) => (
        <article
          key={listing.capabilityId}
          className={`flex flex-col ${APP_SURFACE_NESTED_CARD_CLASS}`}
        >
          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
            {listing.name}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-950/40 dark:text-brand-300">
              {TYPE_LABEL_MAP[listing.type]}
            </span>
            {listing.isOfficialPreset ? (
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                Free
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {listing.description}
          </p>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            {listing.isOfficialPreset ? (
              <>
                {listing.harnessItemCount !== null
                  ? `${listing.harnessItemCount} rules · `
                  : ""}
                installs on your Mac
              </>
            ) : (
              <>
                {listing.ownerName ?? listing.ownerEmail}
                {listing.harnessItemCount !== null
                  ? ` · ${listing.harnessItemCount} rules`
                  : ""}
                {listing.isOnline ? " · online" : ""}
              </>
            )}
          </p>
          <Button
            variant="primary"
            className="mt-auto w-full pt-4 md:w-auto md:self-start"
            onClick={() => onInstall(listing)}
          >
            Install
          </Button>
        </article>
      ))}
    </div>
  );
}
