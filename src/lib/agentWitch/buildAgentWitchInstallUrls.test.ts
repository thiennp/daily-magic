import { afterEach, describe, expect, it, vi } from "vitest";

import {
  buildAgentWitchDmgDownloadUrl,
  buildAgentWitchInstallScriptUrl,
  buildAgentWitchWsUrl,
  buildAppOrigin,
  buildAppOriginFromHeaders,
} from "./buildAgentWitchInstallUrls";

describe("buildAgentWitchInstallUrls", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("builds origin from request url", () => {
    const request = new Request("https://abc.com/some-page");

    expect(buildAppOrigin(request)).toBe("https://abc.com");
    expect(buildAgentWitchInstallScriptUrl("https://abc.com")).toBe(
      "https://abc.com/install/agent-witch.sh",
    );
    expect(buildAgentWitchDmgDownloadUrl("https://abc.com")).toBe(
      "https://www.agentwitch.com/install/agent-witch.dmg",
    );
    expect(buildAgentWitchDmgDownloadUrl("http://localhost:3000")).toBe(
      "http://localhost:3000/install/agent-witch.dmg",
    );
    expect(buildAgentWitchWsUrl("https://abc.com")).toBe(
      "wss://abc.com/api/agent-witch/ws",
    );
  });

  it("builds origin from forwarded request headers", () => {
    const request = new Request("http://internal/", {
      headers: {
        host: "abc.com",
        "x-forwarded-proto": "https",
      },
    });

    expect(buildAppOrigin(request)).toBe("https://abc.com");
  });

  it("defaults non-local hosts to https when proto header is missing", () => {
    const headerList = new Headers({ host: "abc.com" });

    expect(buildAppOriginFromHeaders(headerList)).toBe("https://abc.com");
  });

  it("uses ws for local http origins", () => {
    expect(buildAgentWitchWsUrl("http://localhost:3000")).toBe(
      "ws://localhost:3000/api/agent-witch/ws",
    );
  });

  it("builds agentwitch.com production websocket url", () => {
    expect(buildAgentWitchWsUrl("https://agentwitch.com")).toBe(
      "wss://agentwitch.com/api/agent-witch/ws",
    );
    expect(buildAgentWitchInstallScriptUrl("https://www.agentwitch.com")).toBe(
      "https://www.agentwitch.com/install/agent-witch.sh",
    );
  });

  it("prefers VERCEL_URL over hardcoded fallback origin", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("VERCEL_URL", "daily-magic-five.vercel.app");

    expect(buildAppOriginFromHeaders(new Headers())).toBe(
      "https://daily-magic-five.vercel.app",
    );
  });

  it("falls back to hardcoded app origin when headers are missing", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("VERCEL_URL", "");

    expect(buildAppOriginFromHeaders(new Headers())).toBe(
      "https://www.agentwitch.com",
    );
  });
});
