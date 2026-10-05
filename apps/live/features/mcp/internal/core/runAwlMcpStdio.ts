import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";
import { handleMcpJsonRpcRequest } from "@agent-witch/shared/mcp";

import type {
  McpJsonRpcResponse,
  McpServerDefinition,
} from "../../public-api/types";
import { createAwlMcpServer } from "./createAwlMcpServer";

interface StdioStreams {
  readonly stdin: AsyncIterable<unknown>;
  readonly stdout: { readonly write: (chunk: string) => unknown };
}

const writeFramed = (
  stdout: StdioStreams["stdout"],
  message: McpJsonRpcResponse,
): void => {
  const body = JSON.stringify(message);
  stdout.write(
    `Content-Length: ${Buffer.byteLength(body, "utf8")}\r\n\r\n${body}`,
  );
};

const readFrames = async (
  streams: StdioStreams,
  onMessage: (message: unknown) => void,
): Promise<void> => {
  let buffer = Buffer.alloc(0);
  for await (const chunk of streams.stdin) {
    buffer = Buffer.concat([
      buffer,
      Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk), "utf8"),
    ]);
    for (;;) {
      const headerEnd = buffer.indexOf("\r\n\r\n");
      if (headerEnd < 0) {
        break;
      }
      const header = buffer.subarray(0, headerEnd).toString("utf8");
      const match = /Content-Length:\s*(\d+)/i.exec(header);
      if (match === null) {
        buffer = buffer.subarray(headerEnd + 4);
        continue;
      }
      const length = Number.parseInt(match[1] ?? "0", 10);
      const total = headerEnd + 4 + length;
      if (buffer.length < total) {
        break;
      }
      const body = buffer.subarray(headerEnd + 4, total).toString("utf8");
      buffer = buffer.subarray(total);
      let parsed: unknown;
      try {
        parsed = JSON.parse(body) as unknown;
      } catch {
        parsed = null;
      }
      onMessage(parsed);
    }
  }
};

/** Content-Length framed stdio transport over the shared JSON-RPC core. */
export const serveMcpStdio = async (
  server: McpServerDefinition,
  streams: StdioStreams,
): Promise<void> => {
  await readFrames(streams, (message) => {
    const record =
      typeof message === "object" && message !== null
        ? (message as Readonly<Record<string, unknown>>)
        : null;
    const method = record?.method;
    const response = handleMcpJsonRpcRequest(message, server);
    // Notifications may omit id; only ack when the client sent one.
    if (typeof method === "string" && method.startsWith("notifications/")) {
      if (record?.id !== undefined) {
        writeFramed(streams.stdout, response);
      }
      return;
    }
    writeFramed(streams.stdout, response);
  });
};

/** Stdio MCP for `agent-witch mcp`. */
export const runAwlMcpStdio = async (input: {
  readonly layout: Pick<AgentWitchLocalLayout, "installDir" | "profileEmail">;
}): Promise<void> => {
  await serveMcpStdio(createAwlMcpServer({ layout: input.layout }), {
    stdin: process.stdin,
    stdout: process.stdout,
  });
};
