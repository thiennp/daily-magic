import { describe, expect, it } from "vitest";

import { GET } from "@/app/llms.txt/route";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

const CHROME_MARKERS = [
  "AppShell",
  "MarketingShell",
  "MarketingHeader",
  "MarketingFooter",
  "<html",
  "<nav",
  "className=",
  "globals.css",
] as const;

describe("GET /llms.txt", () => {
  it("serves text/plain with guideline content and no chrome", async () => {
    const response = GET();
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe(
      "text/plain; charset=utf-8",
    );
    expect(body).toContain(`# ${AGENT_WITCH_PRODUCT_NAME}`);
    expect(body).toContain("Guideline:");
    expect(body).toContain("/for-agents");
    for (const marker of CHROME_MARKERS) {
      expect(body.includes(marker)).toBe(false);
    }
  });
});
