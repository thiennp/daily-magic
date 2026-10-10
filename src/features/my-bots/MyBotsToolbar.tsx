"use client";

import {
  MK_COUNT_CLASS,
  MK_SEARCH_CLEAR_CLASS,
  MK_SEARCH_ICON_CLASS,
  MK_SEARCH_INPUT_CLASS,
  MK_SEARCH_WRAP_CLASS,
  MK_TOOLS_CLASS,
} from "@/features/marketplace/public-api/types";
import { MY_BOTS_COPY } from "@/features/my-bots/myBotsCopy.constant";

interface MyBotsToolbarProps {
  readonly query: string;
  readonly shown: number;
  readonly total: number;
  readonly onQueryChange: (query: string) => void;
}

export default function MyBotsToolbar({
  query,
  shown,
  total,
  onQueryChange,
}: MyBotsToolbarProps) {
  return (
    <div className={MK_TOOLS_CLASS}>
      <div className={MK_SEARCH_WRAP_CLASS}>
        <svg
          className={MK_SEARCH_ICON_CLASS}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
        </svg>
        <label className="sr-only" htmlFor="bt-q">
          {MY_BOTS_COPY.searchLabel}
        </label>
        <input
          id="bt-q"
          className={MK_SEARCH_INPUT_CLASS}
          type="search"
          placeholder={MY_BOTS_COPY.searchPlaceholder}
          autoComplete="off"
          spellCheck={false}
          value={query}
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
            {MY_BOTS_COPY.searchClear}
          </button>
        ) : null}
      </div>
      <span className={MK_COUNT_CLASS} role="status">
        {MY_BOTS_COPY.countLabel(shown, total)}
      </span>
    </div>
  );
}
