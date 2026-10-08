"use client";

import {
  MARKETPLACE_SEARCH_CLEAR_LABEL,
  MARKETPLACE_SEARCH_LABEL,
  MARKETPLACE_SEARCH_PLACEHOLDER,
} from "@/features/marketplace/marketplaceCopy.constant";
import {
  MK_SEARCH_CLEAR_CLASS,
  MK_SEARCH_INPUT_CLASS,
  MK_SEARCH_WRAP_CLASS,
} from "@/features/marketplace/marketplaceBrowseClasses.constant";

interface MarketplaceBrowseSearchFieldProps {
  readonly query: string;
  readonly disabled: boolean;
  readonly onQueryChange: (query: string) => void;
}

export default function MarketplaceBrowseSearchField({
  query,
  disabled,
  onQueryChange,
}: MarketplaceBrowseSearchFieldProps) {
  return (
    <div className={MK_SEARCH_WRAP_CLASS}>
      <svg
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-awc-fg-subtle"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
      </svg>
      <label className="sr-only" htmlFor="mk-q">
        {MARKETPLACE_SEARCH_LABEL}
      </label>
      <input
        id="mk-q"
        className={MK_SEARCH_INPUT_CLASS}
        type="search"
        placeholder={MARKETPLACE_SEARCH_PLACEHOLDER}
        autoComplete="off"
        spellCheck={false}
        value={query}
        disabled={disabled}
        onChange={(event) => onQueryChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Escape" && query !== "") {
            event.preventDefault();
            onQueryChange("");
          }
        }}
      />
      {query.length > 0 ? (
        <button
          type="button"
          className={MK_SEARCH_CLEAR_CLASS}
          onClick={() => onQueryChange("")}
        >
          {MARKETPLACE_SEARCH_CLEAR_LABEL}
        </button>
      ) : null}
    </div>
  );
}
