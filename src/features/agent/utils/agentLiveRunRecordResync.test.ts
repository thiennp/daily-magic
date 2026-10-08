import { describe, expect, it } from "vitest";

import {
  buildAgentRunRecordSocketMessage,
  isTerminalAgentRunRecordStatus,
  shouldResyncAgentLiveRunRecord,
} from "@/features/agent/utils/agentLiveRunRecordResync";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

const base = {
  trigger: "reconnected" as const,
  previousConnectionStatus: "disconnected" as const,
  connectionStatus: "connected" as const,
  activeRunId: "run-1",
  isWorking: true,
};

describe("shouldResyncAgentLiveRunRecord", () => {
  it("resyncs when the dashboard socket reconnects during a working run", () => {
    expect(shouldResyncAgentLiveRunRecord(base)).toBe(true);
    expect(
      shouldResyncAgentLiveRunRecord({
        ...base,
        previousConnectionStatus: "connecting",
      }),
    ).toBe(true);
  });

  it("does not resync on first connect or while staying connected", () => {
    expect(
      shouldResyncAgentLiveRunRecord({
        ...base,
        previousConnectionStatus: null,
      }),
    ).toBe(false);
    expect(
      shouldResyncAgentLiveRunRecord({
        ...base,
        previousConnectionStatus: "connected",
      }),
    ).toBe(false);
    expect(
      shouldResyncAgentLiveRunRecord({
        ...base,
        connectionStatus: "disconnected",
      }),
    ).toBe(false);
  });

  it("resyncs a stalled working run regardless of connection edges", () => {
    expect(
      shouldResyncAgentLiveRunRecord({
        ...base,
        trigger: "stalled",
        previousConnectionStatus: "connected",
      }),
    ).toBe(true);
  });

  it("never resyncs without an active working run", () => {
    expect(shouldResyncAgentLiveRunRecord({ ...base, activeRunId: null })).toBe(
      false,
    );
    expect(shouldResyncAgentLiveRunRecord({ ...base, activeRunId: "" })).toBe(
      false,
    );
    expect(
      shouldResyncAgentLiveRunRecord({
        ...base,
        trigger: "stalled",
        isWorking: false,
      }),
    ).toBe(false);
  });
});

describe("isTerminalAgentRunRecordStatus", () => {
  it("treats completed/failed/expired/denied as terminal", () => {
    expect(
      ["completed", "failed", "expired", "denied"].every(
        isTerminalAgentRunRecordStatus,
      ),
    ).toBe(true);
    expect(isTerminalAgentRunRecordStatus("running")).toBe(false);
    expect(isTerminalAgentRunRecordStatus("pending_approval")).toBe(false);
  });
});

describe("buildAgentRunRecordSocketMessage", () => {
  it("wraps the run in the AGENT_RUN_RECORD envelope", () => {
    const run = { id: "run-1", status: "failed" } as AgentRunRecord;
    expect(JSON.parse(buildAgentRunRecordSocketMessage(run))).toEqual({
      type: AGENT_WITCH_MESSAGE_TYPES.AGENT_RUN_RECORD,
      payload: { run },
    });
  });
});
