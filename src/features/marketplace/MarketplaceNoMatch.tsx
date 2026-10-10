"use client";

import {
  MK_EMPTY_CLASS,
  MK_EMPTY_TITLE_CLASS,
} from "@/features/marketplace/marketplaceBrowseClasses.constant";
import {
  MARKETPLACE_CLEAR_FILTERS_LABEL,
  MARKETPLACE_FILTERED_EMPTY_BODY,
  MARKETPLACE_NO_MATCH_TITLE,
} from "@/features/marketplace/marketplaceCopy.constant";
import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/public-api/types";

interface MarketplaceNoMatchProps {
  readonly query: string;
  readonly onClear: () => void;
}

export default function MarketplaceNoMatch({
  query,
  onClear,
}: MarketplaceNoMatchProps) {
  return (
    <div className={MK_EMPTY_CLASS} role="status">
      <svg
        className="size-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
      </svg>
      <h4 className={MK_EMPTY_TITLE_CLASS}>
        {MARKETPLACE_NO_MATCH_TITLE(query)}
      </h4>
      <p className="max-w-[42ch] text-sm">{MARKETPLACE_FILTERED_EMPTY_BODY}</p>
      <button
        type="button"
        className={AWC_PROJECT_ACCESS_CTA.secondary}
        onClick={onClear}
      >
        {MARKETPLACE_CLEAR_FILTERS_LABEL}
      </button>
    </div>
  );
}
