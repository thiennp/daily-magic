import { describe, expect, it } from "vitest";

import { buildKnowledgeReportGlobalInstructionLines } from "./agentWitchKnowledgeReportInstruction.constant";

describe("buildKnowledgeReportGlobalInstructionLines", () => {
  it("embeds the resolved wake port in the URL", () => {
    const lines = buildKnowledgeReportGlobalInstructionLines({
      wakePort: 51_841,
    });
    expect(lines.join("\n")).toContain(
      "http://127.0.0.1:51841/knowledge/update",
    );
    expect(lines.join("\n")).toContain("wake-port.json");
  });
});
