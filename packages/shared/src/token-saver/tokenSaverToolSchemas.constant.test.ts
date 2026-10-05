import { describe, expect, it } from "vitest";

import { CHECK_CONTEXT_STATUSES } from "./checkContextStatus.constant";
import {
  TOKEN_SAVER_TOOL_NAMES,
  TOKEN_SAVER_TOOL_SCHEMAS,
} from "./tokenSaverToolSchemas.constant";

describe("token-saver tool schemas", () => {
  it("locks check_context statuses to hit|miss|none", () => {
    expect([...CHECK_CONTEXT_STATUSES]).toEqual(["hit", "miss", "none"]);
  });

  it("lists the five local MCP tools with unique names", () => {
    expect([...TOKEN_SAVER_TOOL_NAMES]).toEqual([
      "check_context",
      "get_context",
      "get_pitfalls",
      "get_skill",
      "record_outcome",
    ]);
    const names = TOKEN_SAVER_TOOL_SCHEMAS.map((tool) => tool.name);
    expect(new Set(names).size).toBe(5);
  });
});
