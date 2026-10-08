"use client";

import AppIcon from "@/components/ui/icon/AppIcon";
import {
  MK_CARD_BASE_CLASS,
  MK_CARD_BY_CLASS,
  MK_CARD_DESC_CLASS,
  MK_CARD_FOOT_CLASS,
  MK_CARD_HEAD_CLASS,
  MK_CARD_META_CLASS,
  MK_CARD_NAME_BTN_CLASS,
  MK_CARD_NAME_CLASS,
  MK_CARD_TAGS_CLASS,
  MK_INSTALL_BTN_CLASS,
  MK_SRC_OFFICIAL_CLASS,
  MK_SRC_TEAM_CLASS,
  MK_TCHIP_CLASS,
  MK_TICON_CLASS,
} from "@/features/marketplace/marketplaceBrowseClasses.constant";
import {
  MARKETPLACE_INSTALL_ARIA,
  MARKETPLACE_INSTALL_LABEL,
  MARKETPLACE_OFFICIAL_CHIP_LABEL,
  MARKETPLACE_TEAMMATE_CHIP_LABEL,
} from "@/features/marketplace/marketplaceCopy.constant";
import { resolveMarketplaceListingTypeChrome } from "@/features/marketplace/marketplaceListingTypeChrome.constant";
import { buildMarketplaceListCardByLine } from "@/features/marketplace/utils/buildMarketplaceListCardByLine";
import { formatMarketplaceListCardMeta } from "@/features/marketplace/utils/formatMarketplaceListCardMeta";
import { CheckCircleIcon, DownloadIcon } from "@/icons";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";

interface MarketplaceListCardProps {
  readonly listing: HarnessMarketplaceListing;
  readonly onInstall: (listing: HarnessMarketplaceListing) => void;
}

export default function MarketplaceListCard({
  listing,
  onInstall,
}: MarketplaceListCardProps) {
  const chrome = resolveMarketplaceListingTypeChrome(listing.type);
  const isOfficial = listing.isOfficialPreset === true;

  return (
    <article className={`${MK_CARD_BASE_CLASS} ${chrome.borderClass}`}>
      <div className={MK_CARD_HEAD_CLASS}>
        <span
          className={`${MK_TICON_CLASS} ${chrome.iconWrapClass}`}
          aria-hidden
        >
          <AppIcon icon={chrome.icon} size="sm" />
        </span>
        <div className="flex min-w-0 flex-col gap-0.5">
          <h3 className={MK_CARD_NAME_CLASS}>
            <button
              type="button"
              className={MK_CARD_NAME_BTN_CLASS}
              onClick={() => onInstall(listing)}
            >
              {listing.name}
            </button>
          </h3>
          <span className={MK_CARD_BY_CLASS}>
            {buildMarketplaceListCardByLine(listing)}
            {isOfficial ? (
              <AppIcon
                icon={CheckCircleIcon}
                size="sm"
                className="text-awc-blue-600"
                label="Official, made by AgentWitch"
              />
            ) : null}
          </span>
        </div>
      </div>

      <p className={MK_CARD_DESC_CLASS}>{listing.description}</p>

      <div className={MK_CARD_TAGS_CLASS}>
        <span className={`${MK_TCHIP_CLASS} ${chrome.chipClass}`}>
          <AppIcon icon={chrome.icon} size="sm" />
          {chrome.label}
        </span>
        <span
          className={isOfficial ? MK_SRC_OFFICIAL_CLASS : MK_SRC_TEAM_CLASS}
        >
          {isOfficial
            ? MARKETPLACE_OFFICIAL_CHIP_LABEL
            : MARKETPLACE_TEAMMATE_CHIP_LABEL}
        </span>
      </div>

      <div className={MK_CARD_FOOT_CLASS}>
        <p className={MK_CARD_META_CLASS}>
          {formatMarketplaceListCardMeta(listing)}
        </p>
        <button
          type="button"
          className={MK_INSTALL_BTN_CLASS}
          aria-label={MARKETPLACE_INSTALL_ARIA(listing.name)}
          onClick={() => onInstall(listing)}
        >
          <AppIcon icon={DownloadIcon} size="sm" />
          {MARKETPLACE_INSTALL_LABEL}
        </button>
      </div>
    </article>
  );
}
