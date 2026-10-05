import { createCheckContextRunner } from "./createCheckContextRunner";
import { handleAwlMcpRequest } from "./handleAwlMcpRequest";
import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

const writeFramed = (message: Readonly<Record<string, unknown>>): void => {
  const body = JSON.stringify(message);
  const payload = `Content-Length: ${Buffer.byteLength(body, "utf8")}\r\n\r\n${body}`;
  process.stdout.write(payload);
};

const readFrames = async (
  onMessage: (message: unknown) => void,
): Promise<void> => {
  let buffer = Buffer.alloc(0);
  for await (const chunk of process.stdin) {
    buffer = Buffer.concat([buffer, chunk as Buffer]);
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
      try {
        onMessage(JSON.parse(body) as unknown);
      } catch {
        writeFramed({
          jsonrpc: "2.0",
          id: null,
          error: { code: -32700, message: "Parse error" },
        });
      }
    }
  }
};

/** Stdio MCP transport for `agent-witch mcp` (Content-Length framed). */
export const runAwlMcpStdio = async (input: {
  readonly layout: Pick<AgentWitchLocalLayout, "installDir" | "profileEmail">;
}): Promise<void> => {
  const runCheckContext = createCheckContextRunner({ layout: input.layout });
  await readFrames((message) => {
    const record =
      typeof message === "object" && message !== null
        ? (message as Readonly<Record<string, unknown>>)
        : null;
    const method = record?.method;
    const response = handleAwlMcpRequest(message, { runCheckContext });
    // Notifications may omit id; still ack with empty result for initialized.
    if (typeof method === "string" && method.startsWith("notifications/")) {
      if (record?.id !== undefined) {
        writeFramed(response);
      }
      return;
    }
    writeFramed(response);
  });
};
