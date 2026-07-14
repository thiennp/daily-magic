import { describe, expect, it } from "vitest";

import { AGENT_WITCH_INSTALL_BUNDLE_VERSION } from "@/lib/agentWitch/agentWitchInstallBundleVersion";
import { listAgentWitchInstallScriptNames } from "@/lib/agentWitch/listAgentWitchInstallScriptNames";
import { GET } from "@/app/install/agent-witch/version/route";

describe("GET /install/agent-witch/version", () => {
  it("returns bundle version and downloadable script names", async () => {
    const response = await GET();
    const payload: unknown = await response.json();

    expect(payload).toEqual({
      ok: true,
      bundleVersion: AGENT_WITCH_INSTALL_BUNDLE_VERSION,
      scripts: listAgentWitchInstallScriptNames(),
    });
    expect(response.headers.get("Cache-Control")).toBe("no-store");
  });
});
