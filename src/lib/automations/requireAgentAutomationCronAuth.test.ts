import { describe, expect, it } from "vitest";

import { isAuthorizedAgentAutomationCronRequest } from "@/lib/automations/requireAgentAutomationCronAuth";

describe("requireAgentAutomationCronAuth", () => {
  it("accepts Vercel CRON_SECRET bearer auth", () => {
    process.env.CRON_SECRET = "vercel-cron-token";

    const request = new Request(
      "http://localhost/api/cron/agent-automations/tick",
      {
        headers: { authorization: "Bearer vercel-cron-token" },
      },
    );

    expect(isAuthorizedAgentAutomationCronRequest(request)).toBe(true);

    delete process.env.CRON_SECRET;
  });
});
