import { describe, expect, it } from "vitest";

import { handleAwlMcpRequest } from "./handleAwlMcpRequest";

describe("handleAwlMcpRequest", () => {
  it("lists check_context and calls it", () => {
    const runCheckContext = () => ({
      status: "miss" as const,
      projectId: "p1",
    });
    const listed = handleAwlMcpRequest(
      { jsonrpc: "2.0", id: 1, method: "tools/list" },
      { runCheckContext },
    );
    expect(listed).toMatchObject({
      result: { tools: [{ name: "check_context" }] },
    });

    const called = handleAwlMcpRequest(
      {
        jsonrpc: "2.0",
        id: 2,
        method: "tools/call",
        params: {
          name: "check_context",
          arguments: { projectId: "p1", message: "x" },
        },
      },
      { runCheckContext },
    );
    expect(called).toMatchObject({
      result: {
        isError: false,
        content: [
          {
            type: "text",
            text: JSON.stringify({ status: "miss", projectId: "p1" }),
          },
        ],
      },
    });
  });
});
