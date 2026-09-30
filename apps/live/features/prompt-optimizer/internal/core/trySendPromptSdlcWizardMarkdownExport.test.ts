import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { savePromptSdlcLocalCycle } from "./promptSdlcLocalStore";
import { trySendPromptSdlcWizardMarkdownExport } from "./trySendPromptSdlcWizardMarkdownExport";

describe("trySendPromptSdlcWizardMarkdownExport", () => {
  it("returns markdown attachment for a finished wizard run", () => {
    const storePath = path.join(
      os.tmpdir(),
      `prompt-sdlc-export-${crypto.randomUUID()}.json`,
    );
    const cycle = createPromptSdlcLocalCycle({
      goal: "Export test",
      sourcePrompt: "p",
      judgeModel: "codex",
      improverModel: "codex",
      wizard: {
        ...createInitialPromptSdlcWizardState("p"),
        gate: null,
        phase: "complete",
        modules: [],
      },
    });
    savePromptSdlcLocalCycle(storePath, { ...cycle, status: "stopped" });

    const chunks: Buffer[] = [];
    const response = {
      writeHead: () => undefined,
      end: (body: string) => {
        chunks.push(Buffer.from(body));
      },
    };

    const handled = trySendPromptSdlcWizardMarkdownExport({
      method: "GET",
      requestUrl: `/prompt-optimizer?cycle=${cycle.id}&export=wizard-markdown`,
      storePath,
      response: response as never,
    });

    expect(handled).toBe(true);
    expect(Buffer.concat(chunks).toString("utf8")).toContain(
      "# Prompt optimizer — wizard result",
    );
    expect(fs.existsSync(storePath)).toBe(true);
  });
});
