import { afterEach, describe, expect, it, vi } from "vitest";

import {
  isProductionAgentWitchRequestHost,
  isTestAuthBypassAllowedForRequest,
  isTestAuthEnvEnabled,
} from "@/lib/auth/isTestAuthBypassAllowed";

describe("isTestAuthEnvEnabled", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("is true in non-production NODE_ENV", () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("ALLOW_TEST_AUTH", "");
    vi.stubEnv("E2E", "");

    expect(isTestAuthEnvEnabled()).toBe(true);
  });

  it("is true when ALLOW_TEST_AUTH=1 in production NODE_ENV", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("ALLOW_TEST_AUTH", "1");

    expect(isTestAuthEnvEnabled()).toBe(true);
  });

  it("is false in production NODE_ENV without flags", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("ALLOW_TEST_AUTH", "");
    vi.stubEnv("E2E", "");

    expect(isTestAuthEnvEnabled()).toBe(false);
  });
});

describe("isProductionAgentWitchRequestHost", () => {
  it("matches www.agentwitch.com", () => {
    expect(isProductionAgentWitchRequestHost("www.agentwitch.com")).toBe(true);
  });

  it("does not match localhost", () => {
    expect(isProductionAgentWitchRequestHost("localhost:3000")).toBe(false);
    expect(isProductionAgentWitchRequestHost("127.0.0.1:3000")).toBe(false);
  });
});

describe("isTestAuthBypassAllowedForRequest", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("blocks test-login on production host even with ALLOW_TEST_AUTH", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("ALLOW_TEST_AUTH", "1");

    const request = new Request(
      "https://www.agentwitch.com/api/auth/test-login",
    );

    expect(isTestAuthBypassAllowedForRequest(request)).toBe(false);
  });

  it("allows localhost when ALLOW_TEST_AUTH=1", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("ALLOW_TEST_AUTH", "1");

    const request = new Request("http://127.0.0.1:3000/api/auth/test-login");

    expect(isTestAuthBypassAllowedForRequest(request)).toBe(true);
  });
});
