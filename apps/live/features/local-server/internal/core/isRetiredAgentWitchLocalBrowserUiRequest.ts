/**
 * AWL-H7 Arch Exact FIX-1: which local HTTP requests are retired browser UI.
 * Must run AFTER OPTIONS and BEFORE tryHandlePromptSdlcLocalRequest / skill-draft
 * so HTML pages, fragments/cycle, and form POSTs cannot bypass retirement.
 * Keep /prompt-optimizer/agent and /prompt-optimizer/skills/query (API).
 */

const RETIRED_EXACT_PATHS = new Set<string>([
  "/",
  "/task",
  "/writer-sessions",
  "/errors",
  "/status",
  "/traffic",
  "/projects",
  "/project",
  "/project/skill-drafts",
  "/harness",
  "/writer-api",
  "/history",
  "/estimates",
  "/knowledge",
  "/prompt-optimizer",
  "/prompt-optimizer/guide",
  "/prompt-sdlc",
  "/prompt-sdlc/guide",
]);

/** API paths that must stay live under /prompt-optimizer*. */
const KEEP_PROMPT_OPTIMIZER_API_PATHS = new Set<string>([
  "/prompt-optimizer/agent",
  "/prompt-optimizer/skills/query",
  "/prompt-sdlc/agent",
  "/prompt-sdlc/skills/query",
]);

export const isKeptPromptOptimizerApiPath = (pathname: string): boolean =>
  KEEP_PROMPT_OPTIMIZER_API_PATHS.has(pathname);

/**
 * True when pathname is a retired local web UI page (GET HTML or HTML form POST).
 * Fragments/cycle live on `/prompt-optimizer?fragment=run&cycle=` — pathname match.
 */
export const isRetiredAgentWitchLocalBrowserUiPath = (
  pathname: string,
): boolean => {
  if (isKeptPromptOptimizerApiPath(pathname)) {
    return false;
  }
  if (RETIRED_EXACT_PATHS.has(pathname)) {
    return true;
  }
  // Any other /prompt-optimizer* or /prompt-sdlc* page (not keep-list APIs).
  if (
    pathname === "/prompt-optimizer" ||
    pathname.startsWith("/prompt-optimizer/")
  ) {
    return true;
  }
  if (pathname === "/prompt-sdlc" || pathname.startsWith("/prompt-sdlc/")) {
    return true;
  }
  return false;
};

/**
 * Retire GET pages and HTML form POSTs on retired paths.
 * Does not retire OPTIONS (caller handles OPTIONS first).
 */
export const isRetiredAgentWitchLocalBrowserUiRequest = (input: {
  readonly method: string;
  readonly pathname: string;
}): boolean => {
  const method = input.method.toUpperCase();
  if (method !== "GET" && method !== "POST") {
    return false;
  }
  return isRetiredAgentWitchLocalBrowserUiPath(input.pathname);
};
