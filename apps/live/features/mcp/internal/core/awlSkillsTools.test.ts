import { DatabaseSync } from "node:sqlite";

import { describe, expect, it } from "vitest";

import { createAwlMcpServer } from "./createAwlMcpServer";
import { serveMcpStdio } from "./runAwlMcpStdio";

const frame = (message: unknown): string => {
  const body = JSON.stringify(message);
  return `Content-Length: ${Buffer.byteLength(body, "utf8")}\r\n\r\n${body}`;
};

describe("AWL MCP server skills tools", () => {
  it("lists skills_find and skills_run next to check_context over stdio", async () => {
    const db = new DatabaseSync(":memory:");
    const server = createAwlMcpServer({
      layout: { installDir: "/tmp/none", profileEmail: "t@example.com" },
      skillToolDeps: {
        openDb: () => db,
        resolveProjectId: () => null,
        projectDataDir: "/tmp/none",
      },
    });
    const written: string[] = [];
    await serveMcpStdio(server, {
      stdin: (async function* () {
        yield Buffer.from(
          frame({ jsonrpc: "2.0", id: 1, method: "tools/list" }),
          "utf8",
        );
      })(),
      stdout: { write: (chunk: string) => written.push(chunk) },
    });
    const text = written.join("");
    expect(text).toContain('"name":"check_context"');
    expect(text).toContain('"name":"skills_find"');
    expect(text).toContain('"name":"skills_run"');
  });
});
