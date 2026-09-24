import { describe, expect, it } from "vitest";

import {
  coerceAgentAccessArguments,
  readAgentAccessInvokeBody,
} from "@/lib/agentAccess/coerceAgentAccessArguments";
import { formatAgentAccessLlmsText } from "@/lib/agentAccess/formatAgentAccessLlmsText";
import { handleAgentAccessMcpRequest } from "@/lib/agentAccess/handleAgentAccessMcpRequest";

describe("Grokbot agent access calls", () => {
  it("accepts tool arguments sent as a JSON string", () => {
    expect(coerceAgentAccessArguments('{"method":"none"}')).toEqual({
      method: "none",
    });
    expect(
      readAgentAccessInvokeBody({
        name: "register_account",
        arguments: '{"method":"none","displayName":"Grokbot"}',
      }),
    ).toEqual({
      name: "register_account",
      arguments: { method: "none", displayName: "Grokbot" },
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
    await handleAgentAccessMcpRequest(
      {
        jsonrpc: "2.0",
        id: 1,
        method: "tools/call",
        params: {
          name: "whoami",
          arguments: "{}",
        },
      },
      null,
      {
        callTool: async (_name, args) => {
          seen.push(args);
          return { isError: false, text: "{}" };
        },
      },
    );

    expect(seen).toEqual([{}]);
  });

  it("publishes a plain-text guide Grokbot can read", () => {
    const text = formatAgentAccessLlmsText("https://www.agentwitch.com");

    expect(text).toContain("Grokbot");
    expect(text).toContain("https://www.agentwitch.com/for-agents");
    expect(text).toContain("https://www.agentwitch.com/llms.txt");
    expect(text).toContain("get_install_command");
    expect(text).toContain('method "none"');
    expect(text).not.toMatch(/Daily Magic/);
  });
});
