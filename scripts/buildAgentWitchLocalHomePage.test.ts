import { describe, expect, it } from "vitest";

import { buildAgentWitchLocalHomePageBody } from "./buildAgentWitchLocalHomePage";

describe("buildAgentWitchLocalHomePageBody", () => {
  it("links to harness, knowledge, traffic, and status", () => {
    const html = buildAgentWitchLocalHomePageBody({
      wsConnected: true,
      lastHeartbeatAt: new Date().toISOString(),
      installBundleVersion: "88",
      harnessSetCount: 2,
      knowledgeChunkCount: 10,
      trafficEntryCount: 3,
      errorLogByteSize: 10,
      errorLogExists: true,
      wakeError: null,
    });

    expect(html).toContain('href="/harness"');
    expect(html).toContain('href="/knowledge"');
    expect(html).toContain('href="/traffic"');
    expect(html).toContain('href="/errors"');
    expect(html).toContain('href="/status"');
    expect(html).toContain("http://127.0.0.1:43347");
  });
});
