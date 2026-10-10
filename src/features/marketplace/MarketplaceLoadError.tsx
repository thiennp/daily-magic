"use client";

import AppIcon from "@/components/ui/icon/AppIcon";
import {
  MK_EMPTY_CLASS,
  MK_EMPTY_TITLE_CLASS,
} from "@/features/marketplace/marketplaceBrowseClasses.constant";
import {
  MARKETPLACE_LOAD_ERROR_BODY,
  MARKETPLACE_LOAD_ERROR_TITLE,
  MARKETPLACE_TRY_AGAIN_LABEL,
} from "@/features/marketplace/marketplaceCopy.constant";
import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/public-api/types";
import { AlertIcon } from "@/icons";

export default function MarketplaceLoadError({
  onRetry,
}: {
  readonly onRetry: () => void;
}) {
  return (
    <div className={MK_EMPTY_CLASS} role="alert">
      <AppIcon icon={AlertIcon} size="md" className="text-red-600" />
      <h4 className={MK_EMPTY_TITLE_CLASS}>{MARKETPLACE_LOAD_ERROR_TITLE}</h4>
      <p className="max-w-[42ch] text-sm">{MARKETPLACE_LOAD_ERROR_BODY}</p>
      <button
        type="button"
        id="retry-load"
        className={AWC_PROJECT_ACCESS_CTA.primary}
        onClick={onRetry}
      >
        {MARKETPLACE_TRY_AGAIN_LABEL}
      </button>
    </div>
  );
}
