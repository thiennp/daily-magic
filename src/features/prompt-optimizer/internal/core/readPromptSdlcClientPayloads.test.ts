import { describe, expect, it } from "vitest";

import {
  buildPromptSdlcModelOptions,
  readPromptSdlcCyclePayload,
  readPromptSdlcErrorMessage,
  readPromptSdlcMacOptions,
} from "@/features/prompt-optimizer/internal/core/readPromptSdlcClientPayloads";

describe("readPromptSdlcClientPayloads", () => {
  it("reads a cycle, an error, Macs, and the merged model list", () => {
    expect(readPromptSdlcErrorMessage({ errorMessage: "Choose a Mac" })).toBe(
      "Choose a Mac",
    );
    expect(readPromptSdlcErrorMessage({})).toBeNull();
    expect(
      readPromptSdlcCyclePayload({
        ok: true,
        cycle: {
          id: "cycle-1",
          goal: "Be specific",
          status: "judging",
          revisions: [],
        },
      })?.id,
    ).toBe("cycle-1");
    expect(readPromptSdlcCyclePayload({ ok: false })).toBeNull();
    expect(
      readPromptSdlcMacOptions({
        devices: [
          { id: "mac-1", displayName: "Studio", isDispatchReady: true },
          { id: "mac-2", revokedAt: "2026-09-27T00:00:00.000Z" },
          { id: "mac-3", deviceLabel: "Laptop", isDispatchReady: false },
        ],
      }).map((mac) => mac.label),
    ).toEqual(["Studio", "Laptop"]);

    expect(
      buildPromptSdlcModelOptions({
        localBody: {
          ok: true,
          writers: [{ id: "cursor", label: "Cursor" }],
          ollamaModels: ["qwen2.5:7b"],
        },
        cursorCloudConnected: false,
      }).map((option) => option.id),
    ).toEqual(["writer:cursor"]);
  });
});
