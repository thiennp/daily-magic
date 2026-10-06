import { readFileSync } from "node:fs";
import { join } from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import { isAwcTestAutoConnectEnabled } from "@/lib/projects/acl/invites/isAwcTestAutoConnectEnabled";

describe("isAwcTestAutoConnectEnabled", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("is false when NODE_ENV=production even if flag=1", () => {
    expect(
      isAwcTestAutoConnectEnabled({
        nodeEnv: "production",
        flag: "1",
        appBaseUrl: "http://localhost:3000",
      }),
    ).toBe(false);
  });

  it("is false when origin host is www even if NODE_ENV=development", () => {
    expect(
      isAwcTestAutoConnectEnabled({
        nodeEnv: "development",
        flag: "1",
        appBaseUrl: "https://www.agentwitch.com",
      }),
    ).toBe(false);
    expect(
      isAwcTestAutoConnectEnabled({
        nodeEnv: "development",
        flag: "1",
        appBaseUrl: "https://agentwitch.com",
      }),
    ).toBe(false);
  });

  it("is true only for development + localhost + flag=1", () => {
    expect(
      isAwcTestAutoConnectEnabled({
        nodeEnv: "development",
        flag: "1",
        appBaseUrl: "http://localhost:3000",
      }),
    ).toBe(true);
  });

  it("is false when the flag is unset in development", () => {
    expect(
      isAwcTestAutoConnectEnabled({
        nodeEnv: "development",
        flag: "",
        appBaseUrl: "http://localhost:3000",
      }),
    ).toBe(false);
  });

  it("prod short-circuits appear before any return true in source", () => {
    const src = readFileSync(
      join(
        process.cwd(),
        "src/lib/projects/acl/invites/isAwcTestAutoConnectEnabled.ts",
      ),
      "utf8",
    );
    const prodIdx = src.indexOf('nodeEnv === "production"');
    const hostIdx = src.indexOf("isProductionAgentWitchRequestHost(host)");
    const trueIdx = src.indexOf('flag === "1"');
    expect(prodIdx).toBeGreaterThan(-1);
    expect(hostIdx).toBeGreaterThan(prodIdx);
    expect(trueIdx).toBeGreaterThan(hostIdx);
  });
});
