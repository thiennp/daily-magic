import type http from "node:http";

import { describe, expect, it } from "vitest";

import { tryHandlePromptSdlcLocalRequest } from "./tryHandlePromptSdlcLocalRequest";

const route = async (
  method: string,
  pathname: string,
): Promise<{ readonly claimed: boolean; readonly status: number }> => {
  let status = 0;
  const response = {
    writeHead(code: number) {
      status = code;
    },
    end() {
      return;
    },
  } as http.ServerResponse;
  const claimed = await tryHandlePromptSdlcLocalRequest({
    method,
    pathname,
    request: {} as http.IncomingMessage,
    response,
    requestUrl: pathname,
    storePath: "/tmp/prompt-sdlc-cycles.json",
    readBody: async () => "",
    sendHtml: () => undefined,
    renderShell: async () => "",
  });
  return { claimed, status };
};

describe("tryHandlePromptSdlcLocalRequest agent path", () => {
  it("claims the agent path and rejects methods other than GET and POST", async () => {
    const agent = await route("DELETE", "/prompt-sdlc/agent");
    const other = await route("GET", "/health");

    expect(agent).toEqual({ claimed: true, status: 405 });
    expect(other).toEqual({ claimed: false, status: 0 });
  });
});
