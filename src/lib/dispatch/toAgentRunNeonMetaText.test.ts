import { describe, expect, it } from "vitest";

import {
  AGENT_RUN_NEON_META_MAX_CHARS,
  toAgentRunNeonMetaText,
} from "@/lib/dispatch/toAgentRunNeonMetaText";

describe("toAgentRunNeonMetaText", () => {
  it("returns empty for blank / whitespace", () => {
    expect(toAgentRunNeonMetaText("")).toBe("");
    expect(toAgentRunNeonMetaText("  \n\t  ")).toBe("");
  });

  it("collapses whitespace without truncating short text", () => {
    expect(toAgentRunNeonMetaText("  hello\n\nworld  ")).toBe("hello world");
  });

  it(`truncates to ${AGENT_RUN_NEON_META_MAX_CHARS} chars with ellipsis`, () => {
    const long = "x".repeat(AGENT_RUN_NEON_META_MAX_CHARS + 40);
    const out = toAgentRunNeonMetaText(long);
    expect(out.length).toBe(AGENT_RUN_NEON_META_MAX_CHARS);
    expect(out.endsWith("…")).toBe(true);
    expect(out.slice(0, -1)).toBe("x".repeat(AGENT_RUN_NEON_META_MAX_CHARS - 1));
  });
});
