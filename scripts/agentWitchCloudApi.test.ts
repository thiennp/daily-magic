import { describe, expect, it } from "vitest";

import {
  parseAgentWitchHeartbeatResponse,
  parseAgentWitchPollResponse,
} from "./agentWitchCloudApi";

describe("parseAgentWitchHeartbeatResponse", () => {
  it("reads restartRequested from heartbeat payloads", () => {
    expect(
      parseAgentWitchHeartbeatResponse({
        ok: true,
        restartRequested: true,
      }),
    ).toEqual({
      ok: true,
      restartRequested: true,
    });
  });

  it("defaults restartRequested to false for invalid payloads", () => {
    expect(parseAgentWitchHeartbeatResponse(null)).toEqual({
      ok: false,
      restartRequested: false,
    });
  });
});

describe("parseAgentWitchPollResponse", () => {
  it("extracts command messages from poll payloads", () => {
    expect(
      parseAgentWitchPollResponse({
        ok: true,
        command: {
          id: "cmd-1",
          message: {
            type: "command.claude.run",
            payload: { prompt: "hello" },
          },
        },
      }),
    ).toEqual({
      ok: true,
      commandMessage: {
        type: "command.claude.run",
        payload: { prompt: "hello" },
      },
    });
  });

  it("returns null commandMessage when poll is empty", () => {
    expect(parseAgentWitchPollResponse({ ok: true, command: null })).toEqual({
      ok: true,
      commandMessage: null,
    });
  });

  it("marks invalid poll payloads as not ok", () => {
    expect(parseAgentWitchPollResponse({ ok: false })).toEqual({
      ok: false,
      commandMessage: null,
    });
  });
});
