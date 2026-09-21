import { describe, expect, it } from "vitest";

import { parseAgentRunArtifacts } from "@/lib/dispatch/parseAgentRunArtifacts";

describe("parseAgentRunArtifacts", () => {
  it("parses artifact blocks with header and body", () => {
    const output = [
      "Done.",
      "[[ARTIFACT]]",
      "kind: markdown",
      "title: Summary",
      "---",
      "# Hello",
      "[[/ARTIFACT]]",
    ].join("\n");

    const artifacts = parseAgentRunArtifacts(output);
    expect(artifacts).toHaveLength(1);
    expect(artifacts[0]?.kind).toBe("markdown");
    expect(artifacts[0]?.title).toBe("Summary");
    expect(artifacts[0]?.body).toContain("# Hello");
  });
});
