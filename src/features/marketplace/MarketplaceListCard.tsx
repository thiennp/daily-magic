"use client";

import {
  MK_CARD_CLASS,
  MK_CARD_DESC_CLASS,
  MK_CARD_FOOT_CLASS,
  MK_CARD_META_CLASS,
  MK_CARD_NAME_CLASS,
  MK_CARD_OFFICIAL_CLASS,
  MK_CHIP_CLASS,
  MK_CHIP_FREE_CLASS,
  MK_INSTALL_BTN_CLASS,
} from "@/features/marketplace/marketplaceBrowseClasses.constant";
import { formatMarketplaceListCardMeta } from "@/features/marketplace/utils/formatMarketplaceListCardMeta";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";

const TYPE_LABEL_MAP: Record<HarnessMarketplaceListing["type"], string> = {
  [CapabilityType.AGENT]: "Agent",
  [CapabilityType.WORKFLOW]: "Workflow",
};

interface MarketplaceListCardProps {
  readonly listing: HarnessMarketplaceListing;
  readonly onInstall: (listing: HarnessMarketplaceListing) => void;
}

export default function MarketplaceListCard({
  listing,
  onInstall,
}: MarketplaceListCardProps) {
  const surfaceClass = listing.isOfficialPreset
    ? MK_CARD_OFFICIAL_CLASS
    : MK_CARD_CLASS;

  return (
    <article className={surfaceClass}>
      <div className="flex flex-wrap items-center gap-2">
        <span className={MK_CHIP_CLASS}>{TYPE_LABEL_MAP[listing.type]}</span>
        {listing.isOfficialPreset ? (
          <span className={MK_CHIP_FREE_CLASS}>Free</span>
        ) : null}
      </div>

      <h3 className={MK_CARD_NAME_CLASS}>{listing.name}</h3>

      <p className={MK_CARD_DESC_CLASS}>{listing.description}</p>

      <div className={MK_CARD_FOOT_CLASS}>
        <p className={MK_CARD_META_CLASS}>
          {formatMarketplaceListCardMeta(listing)}
        </p>
        <button
          type="button"
          className={MK_INSTALL_BTN_CLASS}
          onClick={() => onInstall(listing)}
        >
          Install
        </button>
      </div>
    </article>
  );
}
