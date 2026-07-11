import { describe, expect, it } from "vitest";

import {
  buildAgentWitchInstallScriptUrl,
  buildAgentWitchWsUrl,
  buildAppOrigin,
  buildAppOriginFromHeaders,
} from "./buildAgentWitchInstallUrls";

describe("buildAgentWitchInstallUrls", () => {
  it("builds origin from request url", () => {
    const request = new Request("https://abc.com/some-page");

    expect(buildAppOrigin(request)).toBe("https://abc.com");
    expect(buildAgentWitchInstallScriptUrl("https://abc.com")).toBe(
      "https://abc.com/install/agent-witch.sh",
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

  it("prefers AUTH_URL over VERCEL_URL for fallback origin", () => {
    const previousAuthUrl = process.env.AUTH_URL;
    const previousVercelUrl = process.env.VERCEL_URL;
    const previousPublicUrl = process.env.NEXT_PUBLIC_APP_URL;

    process.env.NEXT_PUBLIC_APP_URL = "";
    process.env.AUTH_URL = "https://agentwitch.com";
    process.env.VERCEL_URL = "daily-magic-five.vercel.app";

    expect(buildAppOriginFromHeaders(new Headers())).toBe(
      "https://agentwitch.com",
    );

    process.env.AUTH_URL = previousAuthUrl;
    process.env.VERCEL_URL = previousVercelUrl;
    process.env.NEXT_PUBLIC_APP_URL = previousPublicUrl;
  });
});
