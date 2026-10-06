import fs from "node:fs";
import path from "node:path";

import { describe, expect, it, vi } from "vitest";

import { GET } from "@/app/install/agent-witch/scripts/[...scriptName]/route";

vi.mock("@/lib/agentWitch/prepareAgentWitchInstallScriptForShipping", () => ({
  prepareAgentWitchInstallScriptForShipping: async (input: {
    readonly source: string;
  }) => input.source,
}));

const callGet = (scriptName: readonly string[]): Promise<Response> =>
  GET(new Request("https://www.agentwitch.com/install/agent-witch/scripts"), {
    params: Promise.resolve({ scriptName }),
  });

const shippedArtifactPath = (fileName: string): string =>
  path.join(process.cwd(), "public/install/agent-witch/app", fileName);

describe("GET /install/agent-witch/scripts/[...scriptName]", () => {
  it("serves deps.tar.gz as raw gzip bytes instead of minifying it", async () => {
    const response = await callGet(["app", "deps.tar.gz"]);

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("application/gzip");
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    const body = Buffer.from(await response.arrayBuffer());
    expect(
      body.equals(fs.readFileSync(shippedArtifactPath("deps.tar.gz"))),
    ).toBe(true);
  });

  it("serves the JS bundle as text", async () => {
    const response = await callGet(["app", "agent-witch.js"]);

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe(
      "text/plain; charset=utf-8",
    );
    expect(await response.text()).toBe(
      fs.readFileSync(shippedArtifactPath("agent-witch.js"), "utf8"),
    );
  });

  it("returns 404 for names outside the allowlist", async () => {
    const response = await callGet(["app", "nope.js"]);

    expect(response.status).toBe(404);
  });
});
