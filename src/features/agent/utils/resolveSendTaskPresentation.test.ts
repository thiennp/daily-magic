import { describe, expect, it } from "vitest";

import {
  resolveSendTaskCloseAction,
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

describe("resolveSendTaskCloseAction", () => {
  it("AGENT-037: minimizes instead of dismissing while a Mac run is active", () => {
    expect(resolveSendTaskCloseAction({ isSessionActive: true })).toBe(
      "minimize",
    );
  });

  it("dismisses when no live session is running", () => {
    expect(resolveSendTaskCloseAction({ isSessionActive: false })).toBe(
      "dismiss",
    );
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
});
