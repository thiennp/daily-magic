import type { McpToolResult } from "./McpServer.type";

/** Single text-block MCP tools/call result; `isError` only when true. */
export const toMcpTextResult = (
  value: string,
  isError?: boolean,
): McpToolResult => ({
  content: [{ type: "text", text: value }],
  ...(isError === true ? { isError: true } : {}),
});
