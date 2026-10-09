import { describe, expect, it, vi } from "vitest";

import { retryRunInComposer } from "@/features/agent/utils/retryRunInComposer";
import { resolveRunRetryComposerOptions } from "@/features/agent/utils/resolveRunRetryComposerOptions";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

const run = {
  prompt: "Run workflow: Add vibe coding app feature\n\nInputs:\n- App: /x",
  deviceId: "4d58cce5",
  writerAgent: "antigravity",
  projectId: "bad411bf",
  capabilityId: null,
} as AgentRunRecord;

describe("resolveRunRetryComposerOptions (7a3086f1)", () => {
  it("refills the ask, computer, writer and project", () => {
    expect(resolveRunRetryComposerOptions(run)).toEqual({
      prompt: run.prompt,
      customTask: true,
      deviceId: "4d58cce5",
      writerAgent: "antigravity",
      projectId: "bad411bf",
    });
  });

  it("keeps the workflow of a workflow run instead of a blank custom task", () => {
    const options = resolveRunRetryComposerOptions({
      ...run,
      capabilityId: "cap-add-vibe-feature",
    });
    expect(options).toMatchObject({
      libraryCapabilityId: "cap-add-vibe-feature",
      prompt: run.prompt,
    });
    expect(options?.customTask).toBeUndefined();
  });

  it("has nothing to refill without an ask", () => {
    expect(resolveRunRetryComposerOptions(null)).toBeNull();
    expect(resolveRunRetryComposerOptions({ ...run, prompt: "  " })).toBeNull();
  });
});

describe("retryRunInComposer (7a3086f1)", () => {
  it("opens a prefilled New task instead of a blank picker", async () => {
    const openComposer = vi.fn();
    const expandRun = vi.fn();
    await retryRunInComposer({
      runId: "44bdab8e",
      loadRun: async () => run,
      openComposer,
      expandRun,
      floaterRunId: () => null,
    });
    expect(expandRun).not.toHaveBeenCalled();
    expect(openComposer).toHaveBeenCalledWith(
      expect.objectContaining({
        deviceId: "4d58cce5",
        writerAgent: "antigravity",
      }),
    );
  });

  it("reopens the floater when this tab still holds the run", async () => {
    const openComposer = vi.fn();
    const expandRun = vi.fn();
    await retryRunInComposer({
      runId: "44bdab8e",
      loadRun: async () => run,
      openComposer,
      expandRun,
      floaterRunId: () => "44bdab8e",
    });
    expect(expandRun).toHaveBeenCalledWith("44bdab8e");
    expect(openComposer).not.toHaveBeenCalled();
  });

  it("falls back to the floater when the run cannot be loaded", async () => {
    const expandRun = vi.fn();
    await retryRunInComposer({
      runId: "gone",
      loadRun: async () => {
        throw new Error("offline");
      },
      openComposer: vi.fn(),
      expandRun,
      floaterRunId: () => null,
    });
    expect(expandRun).toHaveBeenCalledWith("gone");
  });
});
