import { describe, expect, it } from "vitest";

import { buildAgentWitchLaunchAgentPlistXml } from "./buildAgentWitchLaunchAgentPlistXml";
import { isAgentWitchLaunchAgentPlistXmlValid } from "./isAgentWitchLaunchAgentPlistXmlValid";

describe("buildAgentWitchLaunchAgentPlistXml", () => {
  it("AGENT-067: writes XML that launchd can load", () => {
    const xml = buildAgentWitchLaunchAgentPlistXml({
      launchAgentLabel: "com.agent-witch",
      runPath: "/Users/study/.agent-witch/app/command/run.sh",
      installDir: "/Users/study/.agent-witch",
      homeDir: "/Users/study",
      wakePort: 47892,
    });

    expect(isAgentWitchLaunchAgentPlistXmlValid(xml)).toBe(true);
    expect(xml).toContain("<string>com.agent-witch</string>");
    expect(xml).toContain("<string>47892</string>");
    expect(xml).not.toContain("agent_witch_is_truthy_env");
  });
});
