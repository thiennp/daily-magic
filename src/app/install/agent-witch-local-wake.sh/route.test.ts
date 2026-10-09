import { describe, expect, it } from "vitest";

import { GET } from "@/app/install/agent-witch-local-wake.sh/route";

describe("GET /install/agent-witch-local-wake.sh", () => {
  it("serves an installer with the request origin and the receiver, with no token argument", async () => {
    const response = await GET(
      new Request(
        "https://www.agentwitch.com/install/agent-witch-local-wake.sh",
      ),
    );
    const script = await response.text();

    expect(response.headers.get("Content-Type")).toContain("shellscript");
    expect(script).toContain("APP_ORIGIN='https://www.agentwitch.com'");
    expect(script).toContain("register_project_webhook");
    expect(script).toContain("x-awc-signature");
    expect(script).not.toContain("§{");
    expect(script).not.toContain("--token ");
  });
});
