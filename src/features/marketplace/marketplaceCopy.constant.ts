/**
 * Marketplace page copy — Claude Desktop HTML v2 bright redesign.
 * Design source: docs/design/marketplace/marketplace-v2-bright.html
 * UI says "assistant" not "bot"; AgentWitch is one word.
 */
export const MARKETPLACE_PAGE_TITLE = "Marketplace";

export const MARKETPLACE_PAGE_DESCRIPTION =
  "Playbooks, assistants and harness sets for your project.";

export const MARKETPLACE_SEARCH_LABEL = "Search the Marketplace";

export const MARKETPLACE_SEARCH_PLACEHOLDER =
  "Search playbooks, assistants, harness sets…";

export const MARKETPLACE_SEARCH_CLEAR_LABEL = "Clear";

export const MARKETPLACE_SORT_LABEL = "Sort";

export const MARKETPLACE_TYPE_FILTER_LABEL = "Type";

export const MARKETPLACE_PUBLISHER_FILTER_LABEL = "Publisher";

export const MARKETPLACE_PUBLISHER_FILTER_TIP =
  "Official is made and checked by AgentWitch. Teammates are people in your projects.";

export const MARKETPLACE_FREE_STARTERS_TITLE = "Free starters";

export const MARKETPLACE_TEAMMATES_TITLE = "From teammates";

export const MARKETPLACE_TEAMMATES_DESCRIPTION =
  "Assistants and workflows your teammates shared.";

export const MARKETPLACE_FILTERED_EMPTY_TITLE = "Nothing matches";

export const MARKETPLACE_FILTERED_EMPTY_BODY =
  "Try a different word or remove a filter.";

export const MARKETPLACE_LOADING_LABEL = "Loading the Marketplace…";

export const MARKETPLACE_RESULTS_COUNT_LABEL = (
  shown: number,
  total: number,
): string =>
  shown === total
    ? `${String(total)} ${total === 1 ? "listing" : "listings"}`
    : `${String(shown)} of ${String(total)} listings`;

export const MARKETPLACE_CLEAR_FILTERS_LABEL = "Clear filters";

export const MARKETPLACE_NO_MATCH_TITLE = (query: string): string =>
  query.trim() === "" ? "Nothing matches" : `Nothing matches “${query.trim()}”`;

export const MARKETPLACE_LOAD_ERROR_TITLE = "Could not load the Marketplace";

export const MARKETPLACE_LOAD_ERROR_BODY =
  "Check your connection and try again.";

export const MARKETPLACE_TRY_AGAIN_LABEL = "Try again";

export const MARKETPLACE_PUBLISHER_TIP_LABEL = "About publishers";

export const MARKETPLACE_INSTALL_ARIA = (name: string): string =>
  `Install ${name}`;

export const MARKETPLACE_SORT_OPTIONS = [
  { value: "officialFirst", label: "Official first" },
  { value: "name", label: "Name A to Z" },
] as const;

export const MARKETPLACE_OFFICIAL_CHIP_LABEL = "Official";

export const MARKETPLACE_TEAMMATE_CHIP_LABEL = "Teammate";

export const MARKETPLACE_BY_OFFICIAL = "By AgentWitch";

export const MARKETPLACE_INSTALL_LABEL = "Install";
