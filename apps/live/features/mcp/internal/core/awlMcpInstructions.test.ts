import { handleMcpJsonRpcRequest } from "@agent-witch/shared/mcp";
import { describe, expect, it } from "vitest";

import { AWL_MCP_INSTRUCTIONS } from "./awlMcpInstructions.constant";
import { createAwlMcpServer } from "./createAwlMcpServer";

describe("AWL MCP instructions", () => {
  it("initialize carries the local-first instructions", async () => {
    const server = createAwlMcpServer({
      layout: { installDir: "/nonexistent", profileEmail: null },
    });
    const response = (await handleMcpJsonRpcRequest(
      { jsonrpc: "2.0", id: 1, method: "initialize" },
      server,
      undefined,
    )) as { readonly result: { readonly instructions?: string } };
    expect(response.result.instructions).toBe(AWL_MCP_INSTRUCTIONS);
  });

  it("puts check_context first and names the optimizer last", () => {
    const check = AWL_MCP_INSTRUCTIONS.indexOf("check_context");
    const skills = AWL_MCP_INSTRUCTIONS.indexOf("list_project_skills");
    const runs = AWL_MCP_INSTRUCTIONS.indexOf("list_runs");
    const optimizer = AWL_MCP_INSTRUCTIONS.indexOf("Prompt Optimizer");
    expect(check).toBeGreaterThanOrEqual(0);
    expect(check).toBeLessThan(skills);
    expect(skills).toBeLessThan(runs);
    expect(runs).toBeLessThan(optimizer);
  });
});
