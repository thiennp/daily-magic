import { describe, expect, it } from "vitest";

import { handleMcpJsonRpcRequest } from "@agent-witch/shared/mcp";

import {
  coerceAgentAccessArguments,
  readAgentAccessInvokeBody,
} from "@/lib/agentAccess/coerceAgentAccessArguments";
import { createAgentAccessMcpServer } from "@/lib/agentAccess/createAgentAccessMcpServer";
import { formatAgentAccessLlmsText } from "@/lib/agentAccess/formatAgentAccessLlmsText";

describe("bot agent access calls", () => {
  it("accepts tool arguments sent as a JSON string", () => {
    expect(coerceAgentAccessArguments('{"method":"none"}')).toEqual({
      method: "none",
    });
    expect(
      readAgentAccessInvokeBody({
        name: "register_account",
        arguments: '{"method":"none","displayName":"Scout"}',
      }),
    ).toEqual({
      name: "register_account",
      arguments: { method: "none", displayName: "Scout" },
    });
    expect(
      readAgentAccessInvokeBody({
        name: "list_macs",
        args: {},
      })?.name,
    ).toBe("list_macs");
  });

  it("passes string MCP arguments through as an object", async () => {
    const seen: unknown[] = [];
    const server = createAgentAccessMcpServer({
      callTool: async (_name, args) => {
        seen.push(args);
        return { isError: false, text: "{}" };
      },
    });
    await handleMcpJsonRpcRequest(
      {
        jsonrpc: "2.0",
        id: 1,
        method: "tools/call",
        params: {
          name: "whoami",
          arguments: "{}",
        },
      },
      server,
      { authorization: null },
    );

    expect(seen).toEqual([{}]);
  });

  it("publishes a plain-text guide any bot can read", () => {
    const text = formatAgentAccessLlmsText();

    expect(text).toContain("Any bot");
    expect(text).toContain("https://www.agentwitch.com/for-agents");
    expect(text).toContain("https://www.agentwitch.com/llms.txt");
    expect(text).toContain("get_install_command");
    expect(text).toContain('method "none"');
    expect(text).not.toMatch(/Daily Magic/);
  });
});
