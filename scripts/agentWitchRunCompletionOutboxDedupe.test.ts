import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  enqueueAgentRunCompletionOutbox,
  flushAgentRunCompletionOutbox,
  isAgentRunCompletionPosted,
} from "./agentWitchRunCompletionOutbox";
import type { AgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";

const completeAgentRunOnCloud = vi.fn();

vi.mock("./agentWitchCloudApi", () => ({
  completeAgentRunOnCloud: (...args: unknown[]) =>
    completeAgentRunOnCloud(...args),
}));

const tempRoot = path.join(os.tmpdir(), `awl-outbox-dedupe-${process.pid}`);
// Only installDir/profileEmail are used by the outbox.
const layout = {
  profileEmail: "test@example.com",
  installDir: tempRoot,
} as AgentWitchLocalLayout;
const cloudApi = { appOrigin: "https://app.example.com", pairingToken: "x" };
const outboxPath = path.join(
  tempRoot,
  "profiles",
  "test@example.com",
  "run-completion-outbox.json",
);
const entry = (runId: string, output = "done") => ({
  runId,
  exitCode: 0,
  output,
  createdAt: "2026-10-06T10:00:00.000Z",
});

describe("agentWitchRunCompletionOutbox S0-7c/S0-8", () => {
  afterEach(() => {
    completeAgentRunOnCloud.mockReset();
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  it("posts each run once even with concurrent flushes", async () => {
    completeAgentRunOnCloud.mockResolvedValue(true);
    enqueueAgentRunCompletionOutbox(layout, entry("run-a"));
    await Promise.all([
      flushAgentRunCompletionOutbox({ layout, cloudApi }),
      flushAgentRunCompletionOutbox({ layout, cloudApi }),
    ]);
    expect(completeAgentRunOnCloud).toHaveBeenCalledTimes(1);
    expect(isAgentRunCompletionPosted(layout, "run-a")).toBe(true);
  });

  it("never re-queues a run that was already posted", async () => {
    completeAgentRunOnCloud.mockResolvedValue(true);
    enqueueAgentRunCompletionOutbox(layout, entry("run-b"));
    await flushAgentRunCompletionOutbox({ layout, cloudApi });
    enqueueAgentRunCompletionOutbox(layout, entry("run-b", "again"));
    await flushAgentRunCompletionOutbox({ layout, cloudApi });
    expect(completeAgentRunOnCloud).toHaveBeenCalledTimes(1);
  });

  it("keeps entries queued while a POST is in flight", async () => {
    completeAgentRunOnCloud.mockImplementation(async (_c: unknown, id: string) => {
      if (id === "run-c") enqueueAgentRunCompletionOutbox(layout, entry("run-d"));
      return id === "run-c";
    });
    enqueueAgentRunCompletionOutbox(layout, entry("run-c"));
    await flushAgentRunCompletionOutbox({ layout, cloudApi });
    const left = JSON.parse(fs.readFileSync(outboxPath, "utf8")) as { runId: string }[];
    expect(left.map((item) => item.runId)).toEqual(["run-d"]);
  });

  it("scrubs secrets before the output is stored", () => {
    const fakeKey = ["sk", "FAKEFAKEFAKEFAKEFAKEFAKE00"].join("-");
    enqueueAgentRunCompletionOutbox(layout, entry("run-e", `key ${fakeKey} end`));
    const stored = fs.readFileSync(outboxPath, "utf8");
    expect(stored).not.toContain(fakeKey);
    expect(stored).toContain("[redacted-secret]");
  });
});
