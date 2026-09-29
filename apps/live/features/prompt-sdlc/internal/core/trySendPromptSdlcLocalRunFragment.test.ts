import type http from "node:http";

import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { savePromptSdlcLocalCycle } from "./promptSdlcLocalStore";
import { trySendPromptSdlcLocalRunFragment } from "./trySendPromptSdlcLocalRunFragment";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

describe("trySendPromptSdlcLocalRunFragment", () => {
  it("includes the wizard gate in the run fragment when paused at generalize", () => {
    const storeDir = fs.mkdtempSync(path.join(os.tmpdir(), "psdlc-frag-"));
    const storePath = path.join(storeDir, "prompt-sdlc-cycles.json");
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "g",
        sourcePrompt: "p",
        judgeModel: "claude-cli" as const,
        improverModel: "claude-cli" as const,
        wizard: {
          ...createInitialPromptSdlcWizardState("p"),
          gate: "generalize" as const,
          phase: "generalize" as const,
          templatedPrompt: "Do {{task}}",
          variables: [{ name: "task", description: "t", sampleValue: "x" }],
        },
      }),
      status: "wizard_paused" as const,
    };
    savePromptSdlcLocalCycle(storePath, cycle);

    let body = "";
    const response = {
      writeHead() {
        return;
      },
      end(chunk: string) {
        body = chunk;
      },
    } as unknown as http.ServerResponse;

    const sent = trySendPromptSdlcLocalRunFragment({
      method: "GET",
      requestUrl: `/prompt-sdlc?cycle=${cycle.id}&fragment=run`,
      storePath,
      response,
    });

    expect(sent).toBe(true);
    expect(body).toContain('id="prompt-sdlc-wizard-gate-slot"');
    expect(body).toContain("Step 1 — Generalize");
    expect(body).toContain("Do {{task}}");
    expect(body).toContain('id="prompt-sdlc-run"');
    expect(body).toContain("Wizard paused");
  });
});
