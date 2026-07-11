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
});
