import type http from "node:http";
import { handleMcpJsonRpcRequest } from "@agent-witch/shared/mcp";
import { describe, expect, it, vi } from "vitest";

import type { McpServerDefinition } from "../../public-api/types";
import { serveMcpStdio } from "./runAwlMcpStdio";
import { tryHandleAwlMcpHttpRequest } from "./tryHandleAwlMcpHttpRequest";

const server: McpServerDefinition = {
  serverInfo: { name: "agent-witch", version: "1.0.0" },
  tools: [
    {
      definition: {
        name: "check_context",
        description: "d",
        inputSchema: { type: "object" },
      },
      call: () => ({
        content: [
          {
            type: "text",
            text: JSON.stringify({ status: "miss", projectId: "p1" }),
          },
        ],
        isError: false,
      }),
    },
  ],
};

const callRequest = {
  jsonrpc: "2.0",
  id: 1,
  method: "tools/call",
  params: { name: "check_context", arguments: { projectId: "p1" } },
};

const frame = (message: unknown): string => {
  const body = JSON.stringify(message);
  return `Content-Length: ${Buffer.byteLength(body, "utf8")}\r\n\r\n${body}`;
};

const parseFrames = (output: string): unknown[] =>
  output
    .split(/Content-Length: \d+\r\n\r\n/)
    .filter((part) => part.length > 0)
    .map((part) => JSON.parse(part) as unknown);

const runStdio = async (input: string): Promise<unknown[]> => {
  const written: string[] = [];
  await serveMcpStdio(server, {
    stdin: (async function* () {
      yield Buffer.from(input, "utf8");
    })(),
    stdout: { write: (chunk: string) => written.push(chunk) },
  });
  return parseFrames(written.join(""));
};

const runHttp = async (rawBody: string): Promise<unknown> => {
  const sendJson = vi.fn();
  const handled = await tryHandleAwlMcpHttpRequest({
    method: "POST",
    pathname: "/mcp",
    request: {} as http.IncomingMessage,
    response: {} as http.ServerResponse,
    layout: { installDir: "/nonexistent", profileEmail: null },
    readBody: async () => rawBody,
    sendJson,
    server,
  });
  expect(handled).toBe(true);
  expect(sendJson).toHaveBeenCalledOnce();
  return sendJson.mock.calls[0]?.[2];
};

describe("AWL MCP transports share the JSON-RPC core", () => {
  it("stdio and HTTP return the core response for tools/call", async () => {
    const expected = await handleMcpJsonRpcRequest(
      callRequest,
      server,
      undefined,
    );
    expect(await runStdio(frame(callRequest))).toEqual([expected]);
    expect(await runHttp(JSON.stringify(callRequest))).toEqual(expected);
  });

  it("both map malformed JSON to the core parse error", async () => {
    const expected = await handleMcpJsonRpcRequest(null, server, undefined);
    expect(await runStdio("Content-Length: 5\r\n\r\n{nope")).toEqual([
      expected,
    ]);
    expect(await runHttp("{nope")).toEqual(expected);
  });

  it("stdio skips id-less notifications", async () => {
    const out = await runStdio(
      frame({ jsonrpc: "2.0", method: "notifications/initialized" }) +
        frame({ jsonrpc: "2.0", id: 2, method: "ping" }),
    );
    expect(out).toEqual([{ jsonrpc: "2.0", id: 2, result: {} }]);
  });

  it("HTTP ignores other paths", async () => {
    const handled = await tryHandleAwlMcpHttpRequest({
      method: "POST",
      pathname: "/api/local/check-context",
      request: {} as http.IncomingMessage,
      response: {} as http.ServerResponse,
      layout: { installDir: "/nonexistent", profileEmail: null },
      readBody: async () => "{}",
      sendJson: vi.fn(),
      server,
    });
    expect(handled).toBe(false);
  });
});
