import { describe, expect, it } from "vitest";

import { buildSendTaskComposerHistoryPickerItems } from "@/features/agent/utils/buildSendTaskComposerHistoryPickerItems";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

const buildRun = (
  overrides: Partial<AgentRunRecord> & Pick<AgentRunRecord, "id" | "prompt">,
): AgentRunRecord =>
  ({
    groupId: null,
    requesterUserId: "u1",
    executorUserId: "u1",
    status: "completed",
    dispatchPolicy: "open",
    resultOutput: null,
    resultExitCode: 0,
    denialReason: null,
    createdAt: "2026-07-19T00:00:00.000Z",
    updatedAt: "2026-07-19T00:00:00.000Z",
    startedAt: null,
    completedAt: null,
    approvalExpiresAt: null,
    capabilityId: null,
    capabilityVersionId: null,
    deviceId: "mac-1",
    writerAgent: "claude-cli",
    ...overrides,
  }) as AgentRunRecord;

describe("buildSendTaskComposerHistoryPickerItems", () => {
  it("AGENT-029: maps recent runs into continue-history picker rows", () => {
    const items = buildSendTaskComposerHistoryPickerItems(
      [
        buildRun({
          id: "run-1",
          prompt: "Draft the weekly status",
          capabilityId: "cap-1",
        }),
        buildRun({
          id: "run-2",
          prompt: "Other",
          writerAgent: "not-a-writer",
        }),
      ],
      1,
    );

    expect(items).toEqual([
      {
        kind: "history",
        id: "run-1",
        label: "Draft the weekly status",
        itemType: "history",
        capabilityId: "cap-1",
        deviceId: "mac-1",
        writerAgent: "claude-cli",
      },
    ]);
  });

  it("marks unknown writer agents as null", () => {
    const items = buildSendTaskComposerHistoryPickerItems([
      buildRun({ id: "run-x", prompt: "Hi", writerAgent: "mystery" }),
    ]);
    const item = items[0];
    expect(item?.kind).toBe("history");
    if (item?.kind === "history") {
      expect(item.writerAgent).toBeNull();
    }
  });

  it("AGENT-043: omits history rows without a saved Mac id", () => {
    const items = buildSendTaskComposerHistoryPickerItems([
      buildRun({ id: "run-no-mac", prompt: "Legacy", deviceId: null }),
      buildRun({ id: "run-mac", prompt: "With Mac", deviceId: "mac-2" }),
    ]);

    expect(items.map((item) => item.id)).toEqual(["run-mac"]);
  });
});
