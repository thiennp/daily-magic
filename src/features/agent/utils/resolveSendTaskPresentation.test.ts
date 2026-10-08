import { describe, expect, it } from "vitest";

import {
  resolveSendTaskKeepAliveOnUrlClose,
  resolveSendTaskPresentation,
  shouldKeepSendTaskAliveOnNavigate,
} from "@/features/agent/utils/resolveSendTaskPresentation";

describe("resolveSendTaskPresentation", () => {
  it("AGENT-030: expands when sendTask is in the URL", () => {
    expect(
      resolveSendTaskPresentation({ urlWantsOpen: true, keepAlive: false }),
    ).toBe("expanded");
  });

  it("AGENT-030: docks to minimized when kept alive without sendTask", () => {
    expect(
      resolveSendTaskPresentation({ urlWantsOpen: false, keepAlive: true }),
    ).toBe("minimized");
  });

  it("hides when neither URL nor keep-alive apply", () => {
    expect(
      resolveSendTaskPresentation({ urlWantsOpen: false, keepAlive: false }),
    ).toBe("hidden");
  });
});

describe("shouldKeepSendTaskAliveOnNavigate", () => {
  it("AGENT-030: keeps the panel alive after leaving an open send-task URL", () => {
    expect(
      shouldKeepSendTaskAliveOnNavigate({
        wasUrlOpen: true,
        keepAlive: false,
      }),
    ).toBe(true);
  });
});

describe("resolveSendTaskKeepAliveOnUrlClose", () => {
  it("AGENT-037: keeps the panel alive when navigating away during a live run", () => {
    expect(
      resolveSendTaskKeepAliveOnUrlClose({
        wasUrlOpen: false,
        keepAlive: false,
        isSessionActive: true,
      }),
    ).toBe(true);
  });

  it("S11: an explicit Close hides the floater even while a run is active", () => {
    expect(
      resolveSendTaskKeepAliveOnUrlClose({
        wasUrlOpen: true,
        keepAlive: false,
        isSessionActive: true,
        closedByUser: true,
      }),
    ).toBe(false);
  });
});
