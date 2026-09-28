import type http from "node:http";

import { buildPromptSdlcLocalGuidePageBody } from "./buildPromptSdlcLocalGuidePage";
import { servePromptSdlcLocalPage } from "./servePromptSdlcLocalPage";
import { trySendPromptSdlcLocalRunFragment } from "./trySendPromptSdlcLocalRunFragment";
import { trySendPromptSdlcWriterCheck } from "./trySendPromptSdlcWriterCheck";

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
    readonly activePath: "/prompt-sdlc";
    readonly body: string;
  }) => Promise<string>;
}

export const tryHandlePromptSdlcLocalRequest = async (
  input: PromptSdlcLocalRouteInput,
): Promise<boolean> => {
  if (
    input.pathname !== "/prompt-sdlc" &&
    input.pathname !== "/prompt-sdlc/guide"
  ) {
    return false;
  }

  if (input.method !== "GET" && input.method !== "POST") {
    input.response.writeHead(405);
    input.response.end();
    return true;
  }

  if (input.pathname === "/prompt-sdlc/guide") {
    input.sendHtml(
      input.response,
      await input.renderShell({
        title: "Prompt SDLC",
        activePath: "/prompt-sdlc",
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
