import { describe, expect, it } from "vitest";

import { GET } from "@/app/install/agent-witch-local-wake.sh/route";
import { LOCAL_WAKE_INSTALLER_DEPRECATED_MESSAGE } from "@/lib/agentWitch/localWake/renderLocalWakeDeprecatedInstallScript";

describe("GET /install/agent-witch-local-wake.sh", () => {
  it("serves a deprecated stub that points agents at poll inbox delivery", async () => {
    const response = await GET();
    const script = await response.text();

    expect(response.headers.get("Content-Type")).toContain("shellscript");
    expect(script).toContain("exit 1");
    expect(script).toContain(LOCAL_WAKE_INSTALLER_DEPRECATED_MESSAGE);
    expect(script).not.toContain("register_project_webhook");
    expect(script).not.toMatch(/brew install cloudflared/);
  });
});
