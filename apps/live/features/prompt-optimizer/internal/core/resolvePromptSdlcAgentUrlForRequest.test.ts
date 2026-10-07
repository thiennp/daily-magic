import type { Socket } from "node:net";

import { describe, expect, it } from "vitest";

import { buildPromptSdlcAgentCatalog } from "./buildPromptSdlcAgentCatalog";
import { resolvePromptSdlcAgentUrlForRequest } from "./resolvePromptSdlcAgentUrlForRequest";

const requestOn = (localPort: number | undefined) => ({
  socket: { localPort } as unknown as Socket,
});

describe("resolvePromptSdlcAgentUrlForRequest (DF-033)", () => {
  it("uses the port this AWL actually listens on", () => {
    expect(resolvePromptSdlcAgentUrlForRequest(requestOn(65376))).toBe(
      "http://127.0.0.1:65376/prompt-optimizer/agent",
    );
  });

  it("is undefined when the port is unknown", () => {
    expect(
      resolvePromptSdlcAgentUrlForRequest(requestOn(undefined)),
    ).toBeUndefined();
    expect(resolvePromptSdlcAgentUrlForRequest(undefined)).toBeUndefined();
  });

  it("catalog answers with the real URL and the Mac deep link page — never 43347", () => {
    const catalog = buildPromptSdlcAgentCatalog(
      [],
      "http://127.0.0.1:65376/prompt-optimizer/agent",
    );
    expect(catalog.url).toBe("http://127.0.0.1:65376/prompt-optimizer/agent");
    expect(catalog.post.url).toBe(catalog.url);
    expect(catalog.poll).toContain(
      "http://127.0.0.1:65376/prompt-optimizer/agent?cycle=",
    );
    expect(catalog.page).toBe("agentwitch-local://prompt-optimizer");
    expect(JSON.stringify(catalog)).not.toContain("43347");
  });

  it("catalog default is the <localAppPort> template", () => {
    expect(buildPromptSdlcAgentCatalog([]).url).toBe(
      "http://127.0.0.1:<localAppPort>/prompt-optimizer/agent",
    );
  });
});
