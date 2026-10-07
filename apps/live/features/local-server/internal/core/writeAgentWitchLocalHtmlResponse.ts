import type http from "node:http";

import { AGENT_WITCH_LOCAL_BROWSER_UI_RETIRED_MESSAGE } from "./agentWitchLocalApp.constants";
import {
  isAgentWitchLocalMacWebViewRequest,
  isPromptOptimizerHumanPagePath,
} from "./isRetiredAgentWitchLocalBrowserUiRequest";

export type AgentWitchLocalSendHtml = (
  response: http.ServerResponse,
  html: string,
) => void;

/**
 * DF-029: true only when this request may receive real local HTML — the Mac
 * in-app WKWebView (UA marker) on a Prompt optimizer human page. Every other
 * caller (plain browsers, retired pages) keeps the AWL-H7 retired text.
 */
export const shouldServeAgentWitchLocalHtml = (input: {
  readonly pathname: string;
  readonly userAgent: string | undefined;
}): boolean =>
  isAgentWitchLocalMacWebViewRequest(input.userAgent) &&
  isPromptOptimizerHumanPagePath(input.pathname);

/**
 * Per-request `sendHtml`. Since 30eb7f0d the module-level `sendHtml` dropped
 * its `html` argument, so the H7 PM-3 (b) UA allow reached the Prompt optimizer
 * handler but the Mac webview still got "Open AgentWitch Local from the menu bar."
 */
export const createAgentWitchLocalSendHtml = (input: {
  readonly pathname: string;
  readonly userAgent: string | undefined;
  readonly headers: Readonly<Record<string, string>>;
}): AgentWitchLocalSendHtml => {
  const serveHtml = shouldServeAgentWitchLocalHtml(input);
  return (response, html) => {
    if (serveHtml) {
      response.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
        ...input.headers,
      });
      response.end(html);
      return;
    }
    response.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8",
      ...input.headers,
    });
    response.end(AGENT_WITCH_LOCAL_BROWSER_UI_RETIRED_MESSAGE);
  };
};
