import { describe, expect, it } from "vitest";

import { GET as getRepair } from "@/app/install/agent-witch-repair.sh/route";
import { GET } from "@/app/install/agent-witch-update.sh/route";
import { renderUpdateAgentWitchScript } from "@/lib/agentWitch/renderUpdateAgentWitchScript";

const url = "https://www.agentwitch.com/install/agent-witch-update.sh";

describe("GET /install/agent-witch-update.sh", () => {
  it("AWLR-008: serves the update + repair wrapper with the installer embedded", async () => {
    const response = await GET(new Request(url));
    const script = await response.text();

    expect(response.headers.get("Content-Type")).toBe(
      "text/x-shellscript; charset=utf-8",
    );
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(script).toContain('awl_repair_main "$@"');
    expect(script).toContain(
      renderUpdateAgentWitchScript("https://www.agentwitch.com"),
    );
  });

  it("AWLR-008: the legacy repair URL serves the same script", async () => {
    const update = await (await GET(new Request(url))).text();
    const repair = await (
      await getRepair(
        new Request("https://www.agentwitch.com/install/agent-witch-repair.sh"),
      )
    ).text();

    expect(repair).toBe(update);
  });
});
