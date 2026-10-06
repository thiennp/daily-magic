import { describe, expect, it } from "vitest";

import { AGENT_WITCH_INSTALL_BUNDLE_VERSION } from "@/lib/agentWitch/agentWitchInstallBundleVersion";
import { AGENT_WITCH_LOCAL_MIN_CONNECT_BUNDLE_VERSION } from "@/lib/agentWitch/agentWitchLocalMinConnectBundleVersion.constant";
import { AGENT_WITCH_REPAIR_WINDOWS_COMMAND } from "@/lib/agentWitch/repair/agentWitchRepairWindowsCommand.constant";
import { AGENT_WITCH_REPAIR_COPY } from "@/lib/agentWitch/repair/agentWitchRepairCopy.constant";
import { GET } from "@/app/install/agent-witch/repair/route";

describe("GET /install/agent-witch/repair", () => {
  it("AWLR-002: returns per-OS repair commands, versions and copy", async () => {
    const response = await GET(
      new Request("https://www.agentwitch.com/install/agent-witch/repair"),
    );
    const payload: unknown = await response.json();

    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(payload).toEqual({
      ok: true,
      minBundleVersion: AGENT_WITCH_LOCAL_MIN_CONNECT_BUNDLE_VERSION,
      bundleVersion: AGENT_WITCH_INSTALL_BUNDLE_VERSION,
      commands: {
        scriptUrl: "https://www.agentwitch.com/install/agent-witch-update.sh",
        macos:
          'curl -fsSL "https://www.agentwitch.com/install/agent-witch-update.sh" | bash',
        linux:
          'curl -fsSL "https://www.agentwitch.com/install/agent-witch-update.sh" | bash',
        windows: AGENT_WITCH_REPAIR_WINDOWS_COMMAND,
      },
      copy: AGENT_WITCH_REPAIR_COPY,
    });
  });
});
