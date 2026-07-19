import { describe, expect, it } from "vitest";

import {
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
