import { afterEach, describe, expect, it, vi } from "vitest";

import { guardLocalAppRequest } from "./guardLocalAppRequest";

const ask = (over: Partial<Parameters<typeof guardLocalAppRequest>[0]> = {}) =>
  guardLocalAppRequest({
    host: "127.0.0.1:47000",
    origin: undefined,
    secFetchSite: undefined,
    localPort: 47000,
    ...over,
  });

describe("guardLocalAppRequest", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("lets a local caller without an Origin through", () => {
    expect(ask()).toEqual({ ok: true, allowOrigin: null });
    expect(ask({ host: "localhost:47000" })).toMatchObject({ ok: true });
  });

  it("refuses a DNS-rebinding Host or a wrong port", () => {
    expect(ask({ host: "evil.example:47000" })).toEqual({ ok: false });
    expect(ask({ host: "127.0.0.1:9999" })).toEqual({ ok: false });
    expect(ask({ host: undefined })).toEqual({ ok: false });
  });

  it("answers the app's own page and agentwitch.com, nobody else", () => {
    expect(ask({ origin: "http://127.0.0.1:47000" })).toMatchObject({
      ok: true,
    });
    expect(ask({ origin: "https://www.agentwitch.com" })).toEqual({
      ok: true,
      allowOrigin: "https://www.agentwitch.com",
    });
    expect(ask({ origin: "https://evil.example" })).toEqual({ ok: false });
    expect(ask({ origin: "null" })).toEqual({ ok: false });
    expect(ask({ origin: "http://localhost:3000" })).toEqual({ ok: false });
  });

  it("refuses a cross-site request that carries no Origin", () => {
    expect(ask({ secFetchSite: "cross-site" })).toEqual({ ok: false });
    expect(ask({ secFetchSite: "same-origin" })).toMatchObject({ ok: true });
  });

  it("accepts the local dev web app only when asked for", () => {
    vi.stubEnv("AGENT_WITCH_LOCAL_APP_ALLOW_DEV_ORIGINS", "1");
    expect(ask({ origin: "http://localhost:3000" })).toMatchObject({
      ok: true,
    });
  });
});
