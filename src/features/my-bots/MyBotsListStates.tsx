"use client";

import AppIcon from "@/components/ui/icon/AppIcon";
import { MarketplaceSectionSkeleton } from "@/features/marketplace/public-api/presentation";
import {
  MK_EMPTY_CLASS,
  MK_EMPTY_TITLE_CLASS,
} from "@/features/marketplace/public-api/types";
import { MY_BOTS_COPY } from "@/features/my-bots/myBotsCopy.constant";
import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import { AlertIcon } from "@/icons";

export function MyBotsLoading() {
  return <MarketplaceSectionSkeleton label={MY_BOTS_COPY.loading} />;
}

export function MyBotsLoadError({ onRetry }: { readonly onRetry: () => void }) {
  return (
    <div className={MK_EMPTY_CLASS} role="alert">
      <AppIcon icon={AlertIcon} size="md" className="text-red-600" />
      <h4 className={MK_EMPTY_TITLE_CLASS}>{MY_BOTS_COPY.loadErrorTitle}</h4>
      <p className="max-w-[42ch] text-sm">{MY_BOTS_COPY.loadErrorBody}</p>
      <button
        type="button"
        id="retry-load"
        className={AWC_PROJECT_ACCESS_CTA.primary}
        onClick={onRetry}
      >
        {MY_BOTS_COPY.tryAgain}
      </button>
    </div>
  );
}

export function MyBotsEmpty({ onClaim }: { readonly onClaim: () => void }) {
  return (
    <div className={MK_EMPTY_CLASS}>
      <h4 className={MK_EMPTY_TITLE_CLASS}>{MY_BOTS_COPY.emptyTitle}</h4>
      <p className="max-w-[42ch] text-sm">{MY_BOTS_COPY.emptyBody}</p>
      <button
        type="button"
        className={AWC_PROJECT_ACCESS_CTA.primary}
        onClick={onClaim}
      >
        {MY_BOTS_COPY.claimOpen}
      </button>
    </div>
  );
}

export function MyBotsNoMatch({
  query,
  onClear,
}: {
  readonly query: string;
  readonly onClear: () => void;
}) {
  const q = query.trim();
  return (
    <div className={MK_EMPTY_CLASS} role="status">
      <h4 className={MK_EMPTY_TITLE_CLASS}>
        {q === ""
          ? MY_BOTS_COPY.noMatchTitleFilters
          : `${MY_BOTS_COPY.noMatchTitle} “${q}”`}
      </h4>
      <button
        type="button"
        className={AWC_PROJECT_ACCESS_CTA.secondary}
        onClick={onClear}
      >
        {MY_BOTS_COPY.clearFilters}
      </button>
    </div>
  );
}
