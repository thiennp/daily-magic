/**
 * AWL-H7 Arch Exact FIX-1: which local HTTP requests are retired browser UI.
 * Must run AFTER OPTIONS and BEFORE tryHandlePromptSdlcLocalRequest / skill-draft
 * so HTML pages, fragments/cycle, and form POSTs cannot bypass retirement.
 * Keep /prompt-optimizer/agent and /prompt-optimizer/skills/query (API).
 *
 * AWL-H7 PM-3 (b): Mac in-app WKWebView may load Prompt optimizer human pages.
 * Smallest allow signal: User-Agent marker set via WKWebView
 * `applicationNameForUserAgent` (no new route, no general browser reopen).
 * Other retired paths stay retired even with the marker.
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

/**
 * Appended by Mac WKWebView (`applicationNameForUserAgent`).
 * Plain browsers do not send this — PO HTML stays retired for them.
 */
export const AGENT_WITCH_LOCAL_MAC_WEBVIEW_UA_MARKER =
  "AgentWitchLocal-MacWebView";

export const isKeptPromptOptimizerApiPath = (pathname: string): boolean =>
  KEEP_PROMPT_OPTIMIZER_API_PATHS.has(pathname);

/** True when User-Agent is the Mac in-app Prompt optimizer webview. */
export const isAgentWitchLocalMacWebViewRequest = (
  userAgent: string | undefined,
): boolean =>
  typeof userAgent === "string" &&
  userAgent.includes(AGENT_WITCH_LOCAL_MAC_WEBVIEW_UA_MARKER);

/** Human Prompt optimizer / prompt-sdlc HTML paths (not keep-list APIs). */
export const isPromptOptimizerHumanPagePath = (pathname: string): boolean => {
  if (isKeptPromptOptimizerApiPath(pathname)) {
    return false;
  }
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
 * Mac WKWebView UA marker allows Prompt optimizer human pages only.
 */
export const isRetiredAgentWitchLocalBrowserUiRequest = (input: {
  readonly method: string;
  readonly pathname: string;
  readonly userAgent?: string;
}): boolean => {
  const method = input.method.toUpperCase();
  if (method !== "GET" && method !== "POST") {
    return false;
  }
  if (
    isAgentWitchLocalMacWebViewRequest(input.userAgent) &&
    isPromptOptimizerHumanPagePath(input.pathname)
  ) {
    return false;
  }
  return isRetiredAgentWitchLocalBrowserUiPath(input.pathname);
};
