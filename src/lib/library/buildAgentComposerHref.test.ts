import { describe, expect, it } from "vitest";

import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";

describe("buildAgentComposerHref", () => {
  it("opens the home send-task modal by default", () => {
    expect(buildAgentComposerHref()).toBe("/?sendTask=1");
  });

  it("preserves library, prompt, and device prefill params", () => {
    expect(
      buildAgentComposerHref({
        libraryCapabilityId: "cap-1",
        prompt: "hello",
        deviceId: "device-1",
      }),
    ).toBe(
      "/?sendTask=1&libraryCapabilityId=cap-1&prompt=hello&deviceId=device-1",
    );
  });

  it("AGENT-026 marks continueSession for Mac CLI --continue", () => {
    expect(
      buildAgentComposerHref({
        prompt: "next step",
        continueSession: true,
      }),
    ).toBe("/?sendTask=1&prompt=next+step&continueSession=1");
  });

  it("AGENT-043 pins continueSession to the original Mac", () => {
    expect(
      buildAgentComposerHref({
        continueSession: true,
        deviceId: "mac-1",
      }),
    ).toBe("/?sendTask=1&deviceId=mac-1&continueSession=1");
  });

  it("AGENT-029 marks customTask so the picker can remount safely", () => {
    expect(buildAgentComposerHref({ customTask: true })).toBe(
      "/?sendTask=1&customTask=1",
    );
  });

  it("AGENT-030 opens send-task on the current path for sticky expand", () => {
    expect(buildAgentComposerHref({ pathname: "/library" })).toBe(
      "/library?sendTask=1",
    );
  });

  it("AGENT-032 marks resumeLive when expanding a docked live panel", () => {
    expect(
      buildAgentComposerHref({
        pathname: "/library",
        resumeLiveSession: true,
      }),
    ).toBe("/library?sendTask=1&resumeLive=1");
  });
});
