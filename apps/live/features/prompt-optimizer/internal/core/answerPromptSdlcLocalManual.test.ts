import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { answerPromptSdlcLocalManual } from "./answerPromptSdlcLocalManual";
import {
  readPromptSdlcLocalCycle,
  savePromptSdlcLocalCycle,
} from "./promptSdlcLocalStore";

describe("answerPromptSdlcLocalManual", () => {
  it("returns a live HTML fragment when Stop run posts liveFragment=1", async () => {
    const storePath = path.join(
      os.tmpdir(),
      `prompt-sdlc-manual-fragment-${Date.now()}.json`,
    );
    const cycle = createPromptSdlcLocalCycle({
      goal: "g",
      sourcePrompt: "p",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
    });
    savePromptSdlcLocalCycle(storePath, { ...cycle, status: "improving" });

    const chunks: Buffer[] = [];
    const response = {
      writeHead: (_code: number, _headers: Record<string, string>) => {},
      end: (body: string) => {
        chunks.push(Buffer.from(body));
      },
    };

    const handled = await answerPromptSdlcLocalManual(
      {
        storePath,
        response,
        requestUrl: "/prompt-optimizer",
        method: "POST",
      },
      new URLSearchParams({
        intent: "stop",
        cycleId: cycle.id,
        liveFragment: "1",
      }),
      { writers: [], note: "", canRun: false },
    );

    expect(handled).toBe(true);
    const html = Buffer.concat(chunks).toString("utf8");
    expect(html).toContain('id="prompt-optimizer-run"');
    expect(html).not.toContain(">Stop run<");
    expect(readPromptSdlcLocalCycle(storePath, cycle.id)?.status).toBe(
      "stopped",
    );
    fs.rmSync(storePath, { force: true });
  });
});
