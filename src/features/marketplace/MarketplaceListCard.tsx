"use client";

import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import {
  APP_SURFACE_ACCENT_PANEL_CLASS,
  APP_SURFACE_PANEL_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { MAC_WORKER_BENEFIT_COPY } from "@/lib/copy/macWorkerBenefitCopy.constant";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";

const TYPE_LABEL_MAP: Record<HarnessMarketplaceListing["type"], string> = {
  [CapabilityType.AGENT]: "Agent",
  [CapabilityType.WORKFLOW]: "Workflow",
};

const TYPE_BADGE_COLOR: Record<
  HarnessMarketplaceListing["type"],
  "info" | "primary"
> = {
  [CapabilityType.AGENT]: "info",
  [CapabilityType.WORKFLOW]: "primary",
};

interface MarketplaceListCardProps {
  readonly listing: HarnessMarketplaceListing;
  readonly onInstall: (listing: HarnessMarketplaceListing) => void;
}

const formatListingMetadata = (listing: HarnessMarketplaceListing): string => {
  if (listing.isOfficialPreset) {
    const ruleCount =
      listing.harnessItemCount !== null
        ? `${listing.harnessItemCount} rules · `
        : "";
    return `${ruleCount}rules · ${MAC_WORKER_BENEFIT_COPY.runsOnMacMeta}`;
  }

  const owner = listing.ownerName ?? listing.ownerEmail;
  const ruleSuffix =
    listing.harnessItemCount !== null
      ? ` · ${listing.harnessItemCount} rules`
      : "";
  const onlineSuffix = listing.isOnline ? " · online" : "";
  return `${owner}${ruleSuffix}${onlineSuffix}`;
};

export default function MarketplaceListCard({
  listing,
  onInstall,
}: MarketplaceListCardProps) {
  const surfaceClass = listing.isOfficialPreset
    ? APP_SURFACE_ACCENT_PANEL_CLASS
    : APP_SURFACE_PANEL_CLASS;

  return (
    <article className={`flex h-full flex-col p-4 ${surfaceClass}`}>
      <div className="flex flex-wrap items-center gap-2">
        <Badge size="sm" variant="light" color={TYPE_BADGE_COLOR[listing.type]}>
          {TYPE_LABEL_MAP[listing.type]}
        </Badge>
        {listing.isOfficialPreset ? (
          <Badge size="sm" variant="light" color="success">
            Free
          </Badge>
        ) : null}
      </div>

      <h3 className="mt-2 text-base font-semibold text-gray-800 dark:text-white/90">
        {listing.name}
      </h3>

      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        {listing.description}
      </p>

      <div className="mt-auto border-t border-gray-200/80 pt-3 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {formatListingMetadata(listing)}
        </p>
        <Button
          variant="primary"
          className="mt-3 w-full"
          onClick={() => onInstall(listing)}
        >
          Install
        </Button>
      </div>
    </article>
  );
}
