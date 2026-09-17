import { describe, expect, it } from "vitest";

import { isAgentWitchLaunchAgentPlistXmlValid } from "./isAgentWitchLaunchAgentPlistXmlValid";

describe("isAgentWitchLaunchAgentPlistXmlValid", () => {
  it("AGENT-067: accepts a well-formed LaunchAgent plist", () => {
    expect(
      isAgentWitchLaunchAgentPlistXmlValid(`<?xml version="1.0" encoding="UTF-8"?>
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.agent-witch</string>
</dict>
</plist>
`),
    ).toBe(true);
  });

  it("AGENT-067: rejects bash leaked into the plist XML", () => {
    expect(
      isAgentWitchLaunchAgentPlistXmlValid(`<?xml version="1.0" encoding="UTF-8"?>
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.agent-witch</string>
if agent_witch_is_truthy_env ""; then
  cat <<'AWI_PROCESS_HOST_ENV'
    <key>AGENT_WITCH_EXTERNAL_BRIDGE</key>
AWI_PROCESS_HOST_ENV
fi
</dict>
</plist>
`),
    ).toBe(false);
  });
});
