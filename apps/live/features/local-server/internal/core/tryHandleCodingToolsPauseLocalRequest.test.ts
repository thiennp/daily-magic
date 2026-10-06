import fs from "node:fs";
import type http from "node:http";
import os from "node:os";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";

import { isCodingToolsPaused } from "@agent-witch/install-runtime-client";

import {
  CODING_TOOLS_PAUSE_LOCAL_PATH,
  tryHandleCodingToolsPauseLocalRequest,
} from "./tryHandleCodingToolsPauseLocalRequest";

const profileDir = fs.mkdtempSync(path.join(os.tmpdir(), "awl-pause-route-"));
const configPath = path.join(profileDir, "config.json");

const call = async (input: {
  method: string;
  body?: string;
  origin?: string;
  pathname?: string;
}) => {
  const sendJson = vi.fn();
  const handled = await tryHandleCodingToolsPauseLocalRequest({
    method: input.method,
    pathname: input.pathname ?? CODING_TOOLS_PAUSE_LOCAL_PATH,
    request: {
      headers: input.origin !== undefined ? { origin: input.origin } : {},
    } as http.IncomingMessage,
    response: {} as http.ServerResponse,
    configPath,
    readBody: async () => input.body ?? "",
    sendJson,
  });
  return { handled, status: sendJson.mock.calls[0]?.[1], body: sendJson.mock.calls[0]?.[2] };
};

describe("tryHandleCodingToolsPauseLocalRequest", () => {
  it("ignores other paths", async () => {
    expect((await call({ method: "GET", pathname: "/health" })).handled).toBe(false);
  });

  it("reports and flips the switch for same-machine callers", async () => {
    expect((await call({ method: "GET" })).body).toMatchObject({
      paused: false,
      label: "Pause all coding tools",
    });
    const on = await call({ method: "POST", body: '{"paused":true}' });
    expect(on).toMatchObject({ status: 200, body: { paused: true } });
    expect(isCodingToolsPaused(configPath)).toBe(true);
  });

  it("refuses cross-site browser origins", async () => {
    const result = await call({
      method: "POST",
      body: '{"paused":false}',
      origin: "https://evil.example",
    });
    expect(result.status).toBe(403);
    expect(isCodingToolsPaused(configPath)).toBe(true);
  });

  it("rejects bodies without a boolean", async () => {
    expect((await call({ method: "POST", body: '{"paused":"no"}' })).status).toBe(400);
  });
});
