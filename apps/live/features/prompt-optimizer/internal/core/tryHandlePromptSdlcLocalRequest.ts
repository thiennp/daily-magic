import type http from "node:http";

import { buildPromptSdlcLocalGuidePageBody } from "./buildPromptSdlcLocalGuidePage";
import { servePromptSdlcLocalPage } from "./servePromptSdlcLocalPage";
import { trySendPromptSdlcLocalRunFragment } from "./trySendPromptSdlcLocalRunFragment";
import { trySendPromptSdlcWriterCheck } from "./trySendPromptSdlcWriterCheck";
import { writePromptSdlcAgentResponse } from "./writePromptSdlcAgentResponse";

export interface PromptSdlcLocalRouteInput {
  readonly method: string;
  readonly pathname: string;
  readonly request: http.IncomingMessage;
  readonly response: http.ServerResponse;
  readonly requestUrl: string;
  readonly storePath: string;
  readonly readBody: (request: http.IncomingMessage) => Promise<string>;
  readonly sendHtml: (response: http.ServerResponse, html: string) => void;
  readonly renderShell: (shell: {
    readonly title: string;
    readonly activePath: "/prompt-optimizer";
    readonly body: string;
  }) => Promise<string>;
}

const legacyPromptOptimizerRedirect = (
  pathname: string,
  requestUrl: string,
): string | null => {
  if (pathname === "/prompt-sdlc") {
    return "/prompt-optimizer";
  }
  if (pathname === "/prompt-sdlc/guide") {
    return "/prompt-optimizer/guide";
  }
  if (pathname === "/prompt-sdlc/agent") {
    return "/prompt-optimizer/agent";
  }
  if (!pathname.startsWith("/prompt-sdlc")) {
    return null;
  }
  const url = new URL(requestUrl, "http://127.0.0.1");
  url.pathname = pathname.replace(/^\/prompt-sdlc/, "/prompt-optimizer");
  return `${url.pathname}${url.search}`;
};

export const tryHandlePromptSdlcLocalRequest = async (
  input: PromptSdlcLocalRouteInput,
): Promise<boolean> => {
  const legacyTarget = legacyPromptOptimizerRedirect(
    input.pathname,
    input.requestUrl,
  );
  if (legacyTarget !== null) {
    input.response.writeHead(308, { Location: legacyTarget });
    input.response.end();
    return true;
  }

  if (
    input.pathname !== "/prompt-optimizer" &&
    input.pathname !== "/prompt-optimizer/guide" &&
    input.pathname !== "/prompt-optimizer/agent"
  ) {
    return false;
  }

  if (input.method !== "GET" && input.method !== "POST") {
    input.response.writeHead(405);
    input.response.end();
    return true;
  }

  if (input.pathname === "/prompt-optimizer/agent") {
    await writePromptSdlcAgentResponse(input);
    return true;
  }

  if (input.pathname === "/prompt-optimizer/guide") {
    input.sendHtml(
      input.response,
      await input.renderShell({
        title: "Prompt optimizer",
        activePath: "/prompt-optimizer",
        body: buildPromptSdlcLocalGuidePageBody(),
      }),
    );
    return true;
  }

  if (
    await trySendPromptSdlcWriterCheck({
      method: input.method,
      requestUrl: input.requestUrl,
      response: input.response,
      storePath: input.storePath,
    })
  ) {
    return true;
  }

  if (
    trySendPromptSdlcLocalRunFragment({
      method: input.method,
      requestUrl: input.requestUrl,
      storePath: input.storePath,
      response: input.response,
    })
  ) {
    return true;
  }

  await servePromptSdlcLocalPage(input);
  return true;
};
