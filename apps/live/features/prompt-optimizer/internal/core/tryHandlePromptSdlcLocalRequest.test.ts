import type http from "node:http";

import { describe, expect, it } from "vitest";

import { tryHandlePromptSdlcLocalRequest } from "./tryHandlePromptSdlcLocalRequest";

const route = async (
  method: string,
  pathname: string,
): Promise<{
  readonly claimed: boolean;
  readonly status: number;
  readonly location: string;
}> => {
  let status = 0;
  let location = "";
  const response = {
    writeHead(code: number, headers?: Record<string, string>) {
      status = code;
      location = headers?.Location ?? "";
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
    storePath: "/tmp/prompt-optimizer-cycles.json",
    readBody: async () => "",
    sendHtml: () => undefined,
    renderShell: async () => "",
  });
  return { claimed, status, location };
};

describe("tryHandlePromptSdlcLocalRequest agent path", () => {
  it("redirects legacy /prompt-sdlc URLs to /prompt-optimizer", async () => {
    const legacy = await route("GET", "/prompt-sdlc/guide");
    expect(legacy.claimed).toBe(true);
    expect(legacy.status).toBe(308);
    expect(legacy.location).toBe("/prompt-optimizer/guide");
  });

  it("claims the agent path and rejects methods other than GET and POST", async () => {
    const agent = await route("DELETE", "/prompt-optimizer/agent");
    const other = await route("GET", "/health");

    expect(agent).toMatchObject({ claimed: true, status: 405 });
    expect(other).toMatchObject({ claimed: false, status: 0 });
  });

  it("claims the folder-skills query path", async () => {
    const skills = await route("POST", "/prompt-optimizer/skills/query");
    expect(skills.claimed).toBe(true);
  });
});
