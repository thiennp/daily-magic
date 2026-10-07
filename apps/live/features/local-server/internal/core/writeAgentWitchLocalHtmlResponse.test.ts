import fs from "node:fs";
import http from "node:http";
import type { AddressInfo } from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { afterEach, describe, expect, it } from "vitest";

import { AGENT_WITCH_LOCAL_BROWSER_UI_RETIRED_MESSAGE } from "./agentWitchLocalApp.constants";
import {
  AGENT_WITCH_LOCAL_MAC_WEBVIEW_UA_MARKER,
  isRetiredAgentWitchLocalBrowserUiRequest,
} from "./isRetiredAgentWitchLocalBrowserUiRequest";
import {
  createAgentWitchLocalSendHtml,
  shouldServeAgentWitchLocalHtml,
} from "./writeAgentWitchLocalHtmlResponse";

const MAC_UA = `Mozilla/5.0 (Macintosh) AppleWebKit/605.1.15 ${AGENT_WITCH_LOCAL_MAC_WEBVIEW_UA_MARKER}`;
const BROWSER_UA =
  "Mozilla/5.0 (Macintosh) AppleWebKit/537.36 Chrome/141.0 Safari/537.36";
const PAGE_HTML =
  "<!doctype html><title>Prompt optimizer</title><main>wizard</main>";

const servers: http.Server[] = [];

afterEach(async () => {
  await Promise.all(
    servers
      .splice(0)
      .map(
        (server) =>
          new Promise<void>((resolve) => server.close(() => resolve())),
      ),
  );
});

/** Same composition as startAgentWitchLocalApp: retire guard, then PO handler with per-request sendHtml. */
const startServer = async (): Promise<string> => {
  const server = http.createServer((request, response) => {
    const pathname = request.url?.split("?")[0] ?? "/";
    const method = request.method ?? "GET";
    const userAgent = request.headers["user-agent"];
    const headers = { "Access-Control-Allow-Origin": "*" };
    if (
      isRetiredAgentWitchLocalBrowserUiRequest({ method, pathname, userAgent })
    ) {
      createAgentWitchLocalSendHtml({
        pathname: "/",
        userAgent: undefined,
        headers,
      })(response, "");
      return;
    }
    createAgentWitchLocalSendHtml({ pathname, userAgent, headers })(
      response,
      PAGE_HTML,
    );
  });
  servers.push(server);
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address() as AddressInfo;
  return `http://127.0.0.1:${port}`;
};

describe("DF-029 createAgentWitchLocalSendHtml", () => {
  it("serves real PO HTML to the Mac webview UA", async () => {
    const origin = await startServer();
    const response = await fetch(`${origin}/prompt-optimizer`, {
      headers: { "user-agent": MAC_UA },
    });
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe(
      "text/html; charset=utf-8",
    );
    expect(await response.text()).toBe(PAGE_HTML);
  });

  it("serves the guide and ?cycle= views to the Mac webview UA", async () => {
    const origin = await startServer();
    for (const url of [
      "/prompt-optimizer/guide",
      "/prompt-optimizer?cycle=abc",
    ]) {
      const response = await fetch(`${origin}${url}`, {
        headers: { "user-agent": MAC_UA },
      });
      expect(await response.text()).toBe(PAGE_HTML);
    }
  });

  it("keeps the retired text for plain browsers on PO pages", async () => {
    const origin = await startServer();
    const response = await fetch(`${origin}/prompt-optimizer`, {
      headers: { "user-agent": BROWSER_UA },
    });
    expect(response.headers.get("content-type")).toBe(
      "text/plain; charset=utf-8",
    );
    expect(await response.text()).toBe(
      AGENT_WITCH_LOCAL_BROWSER_UI_RETIRED_MESSAGE,
    );
  });

  it("keeps other retired pages retired even with the Mac UA", async () => {
    const origin = await startServer();
    for (const url of ["/status", "/", "/projects", "/writer-api"]) {
      const response = await fetch(`${origin}${url}`, {
        headers: { "user-agent": MAC_UA },
      });
      expect(await response.text()).toBe(
        AGENT_WITCH_LOCAL_BROWSER_UI_RETIRED_MESSAGE,
      );
    }
  });

  it("decides HTML only for Mac UA + PO human page", () => {
    expect(
      shouldServeAgentWitchLocalHtml({
        pathname: "/prompt-optimizer",
        userAgent: MAC_UA,
      }),
    ).toBe(true);
    expect(
      shouldServeAgentWitchLocalHtml({
        pathname: "/prompt-optimizer",
        userAgent: BROWSER_UA,
      }),
    ).toBe(false);
    expect(
      shouldServeAgentWitchLocalHtml({
        pathname: "/prompt-optimizer",
        userAgent: undefined,
      }),
    ).toBe(false);
    expect(
      shouldServeAgentWitchLocalHtml({
        pathname: "/prompt-optimizer/agent",
        userAgent: MAC_UA,
      }),
    ).toBe(false);
    expect(
      shouldServeAgentWitchLocalHtml({
        pathname: "/status",
        userAgent: MAC_UA,
      }),
    ).toBe(false);
  });

  it("startAgentWitchLocalApp passes the per-request sendHtml to the PO handler", () => {
    const source = fs.readFileSync(
      path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        "startAgentWitchLocalApp.ts",
      ),
      "utf8",
    );
    const poCall = source.slice(
      source.indexOf("await tryHandlePromptSdlcLocalRequest({"),
    );
    const poBlock = poCall.slice(0, poCall.indexOf("})"));
    expect(poBlock).toContain("sendHtml: createAgentWitchLocalSendHtml({");
    expect(poBlock).toContain("userAgent,");
  });
});
