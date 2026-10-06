import { describe, expect, it } from "vitest";

import { GET } from "@/app/install/agent-witch-repair.sh/route";

describe("GET /install/agent-witch-repair.sh", () => {
  it("AWLR-003: serves the repair wrapper (not the bare installer)", async () => {
    const response = await GET(
      new Request("https://www.agentwitch.com/install/agent-witch-repair.sh"),
    );
    const script = await response.text();

    expect(response.headers.get("Content-Type")).toBe(
      "text/x-shellscript; charset=utf-8",
    );
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(script).toContain("awl_repair_main");
    expect(script).toContain("awl_repair_write_installer");
  });
});
