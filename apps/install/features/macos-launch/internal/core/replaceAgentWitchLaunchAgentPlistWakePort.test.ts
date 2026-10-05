import { describe, expect, it } from "vitest";

import { replaceAgentWitchLaunchAgentPlistWakePort } from "./replaceAgentWitchLaunchAgentPlistWakePort";

const sample = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>EnvironmentVariables</key>
  <dict>
    <key>AGENT_WITCH_WAKE_PORT</key>
    <string>61774</string>
  </dict>
</dict>
</plist>
`;

describe("replaceAgentWitchLaunchAgentPlistWakePort", () => {
  it("rewrites a drifted AGENT_WITCH_WAKE_PORT to the wake-port.json value", () => {
    const next = replaceAgentWitchLaunchAgentPlistWakePort(sample, 49273);
    expect(next).toContain("<string>49273</string>");
    expect(next).not.toContain("61774");
  });

  it("returns null when the plist has no AGENT_WITCH_WAKE_PORT entry", () => {
    expect(replaceAgentWitchLaunchAgentPlistWakePort("<plist/>", 49273)).toBeNull();
  });
});
