import { describe, expect, it } from "vitest";

import { buildAgentWitchLocalHomePageBody } from "./buildAgentWitchLocalHomePage";

describe("buildAgentWitchLocalHomePageBody", () => {
  it("links to harness, knowledge, traffic, and status", () => {
    const html = buildAgentWitchLocalHomePageBody({
      wsConnected: true,
      lastHeartbeatAt: new Date().toISOString(),
      harnessSetCount: 2,
      knowledgeChunkCount: 10,
      trafficEntryCount: 3,
      errorLogByteSize: 10,
      errorLogExists: true,
      wakeError: null,
    });

    expect(html).toContain('href="/task"');
    expect(html).toContain('href="/harness"');
    expect(html).toContain('href="/knowledge"');
    expect(html).toContain('href="/traffic"');
    expect(html).toContain('href="/errors"');
    expect(html).toContain('href="/status"');
    expect(html).toContain("data-heartbeat-at");
    expect(html).toContain("js-heartbeat-elapsed");
    expect(html).not.toContain("local.agentwitch.com");
  });
});
