import { describe, expect, it } from "vitest";

import {
  parsePromptSdlcLocalResultRequest,
  parsePromptSdlcStartRequest,
} from "@/lib/promptSdlc/parsePromptSdlcHttpBodies";

describe("parsePromptSdlcHttpBodies", () => {
  it("parses a start request and a local reply", () => {
    expect(
      parsePromptSdlcStartRequest({
        goal: "Be specific",
        sourcePrompt: "Do it",
        judgeKind: "writer",
        judgeModel: "cursor",
        improverKind: "ollama",
        improverModel: "qwen2.5:7b",
      }),
    ).toEqual({
      goal: "Be specific",
      sourcePrompt: "Do it",
      deviceId: null,
      judge: { kind: "writer", writerAgent: "cursor" },
      improver: { kind: "ollama", model: "qwen2.5:7b" },
    });

    expect(
      parsePromptSdlcStartRequest({
        goal: "Be specific",
        sourcePrompt: "Do it",
        deviceId: null,
        judgeKind: "ollama",
        judgeModel: "qwen2.5:7b",
        improverKind: "ollama",
        improverModel: "qwen2.5:7b",
      })?.deviceId,
    ).toBeNull();
    expect(parsePromptSdlcStartRequest({ goal: "x" })).toBeNull();
    expect(
      parsePromptSdlcStartRequest({
        goal: "Be specific",
        sourcePrompt: "Do it",
        judgeKind: "writer",
        judgeModel: "missing-writer",
        improverKind: "ollama",
        improverModel: "qwen2.5:7b",
      }),
    ).toBeNull();
    expect(
      parsePromptSdlcLocalResultRequest({ role: "judge", text: "" }),
    ).toEqual({
      role: "judge",
      text: "",
    });
    expect(
      parsePromptSdlcLocalResultRequest({ role: "score", text: "x" }),
    ).toBeNull();
    expect(parsePromptSdlcLocalResultRequest(null)).toBeNull();
  });
});
