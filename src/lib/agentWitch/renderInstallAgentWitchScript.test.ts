import { describe, expect, it } from "vitest";

import { renderInstallAgentWitchScript } from "@/lib/agentWitch/renderInstallAgentWitchScript";

describe("renderInstallAgentWitchScript", () => {
  it("approves npm install scripts and opens Home after install on macOS", () => {
    const script = renderInstallAgentWitchScript("https://www.agentwitch.com");

    expect(script).toContain('"allowScripts"');
    expect(script).toContain("npm approve-scripts --allow-scripts-pending");
    expect(script).toContain("register_agent_witch_launch_agent");
    expect(script).toContain('nohup "${RUN_PATH}"');
    expect(script).toContain('open "https://www.agentwitch.com/"');
    expect(script).toContain("wss://www.agentwitch.com/api/agent-witch/ws");
    expect(script).toContain("agentWitchRunSessions.ts");
    expect(script).toContain("agentWitchLocalRunStore.ts");
  });
});
