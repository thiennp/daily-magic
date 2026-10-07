import { afterEach, describe, expect, it, vi } from "vitest";

import {
  isProjectConnectionsFeatureEnabled,
  resolveProjectConnectionsAuthSecret,
} from "@/lib/projects/connections/isProjectConnectionsFeatureEnabled";
import { getProviderOAuthConfig } from "@/lib/projects/connections/getProviderOAuthConfig";
import { startProjectConnectionOAuth } from "@/lib/projects/connections/startProjectConnectionOAuth";

describe("project connections feature gates", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("defaults enabled; 0 disables", () => {
    vi.stubEnv("PROJECT_CONNECTIONS_ENABLED", "");
    expect(isProjectConnectionsFeatureEnabled()).toBe(true);
    vi.stubEnv("PROJECT_CONNECTIONS_ENABLED", "0");
    expect(isProjectConnectionsFeatureEnabled()).toBe(false);
  });

  it("start returns unavailable without provider env", () => {
    vi.stubEnv("AUTH_SECRET", "test-secret");
    vi.stubEnv("PROJECT_CONNECTIONS_GITHUB_CLIENT_ID", "");
    vi.stubEnv("PROJECT_CONNECTIONS_GITHUB_CLIENT_SECRET", "");
    expect(
      startProjectConnectionOAuth({
        projectId: "p1",
        provider: "github",
        actorUserId: "u1",
      }),
    ).toEqual({ ok: false, code: "unavailable" });
  });

  it("start returns unavailable for linear when env missing", () => {
    vi.stubEnv("AUTH_SECRET", "test-secret");
    vi.stubEnv("PROJECT_CONNECTIONS_LINEAR_CLIENT_ID", "");
    vi.stubEnv("PROJECT_CONNECTIONS_LINEAR_CLIENT_SECRET", "");
    expect(getProviderOAuthConfig("linear")).toBeNull();
    expect(
      startProjectConnectionOAuth({
        projectId: "p1",
        provider: "linear",
        actorUserId: "u1",
      }),
    ).toEqual({ ok: false, code: "unavailable" });
  });

  it("start returns url for linear when env present (P2)", () => {
    vi.stubEnv("AUTH_SECRET", "test-secret");
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("PROJECT_CONNECTIONS_LINEAR_CLIENT_ID", "lin-id");
    vi.stubEnv("PROJECT_CONNECTIONS_LINEAR_CLIENT_SECRET", "lin-secret");
    const config = getProviderOAuthConfig("linear");
    expect(config?.phase).toBe(1);
    const started = startProjectConnectionOAuth({
      projectId: "p1",
      provider: "linear",
      actorUserId: "u1",
    });
    expect(started.ok).toBe(true);
    if (started.ok) {
      expect(started.url).toContain("linear.app/oauth/authorize");
      expect(started.url).toContain("scope=read%2Cwrite");
    }
  });

  it("start returns url when github env present", () => {
    vi.stubEnv("AUTH_SECRET", "test-secret");
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("PROJECT_CONNECTIONS_GITHUB_CLIENT_ID", "gh-id");
    vi.stubEnv("PROJECT_CONNECTIONS_GITHUB_CLIENT_SECRET", "gh-secret");
    const started = startProjectConnectionOAuth({
      projectId: "p1",
      provider: "github",
      actorUserId: "u1",
    });
    expect(started.ok).toBe(true);
    if (started.ok) {
      expect(started.url).toContain("github.com/login/oauth/authorize");
      expect(started.url).toContain("client_id=gh-id");
      expect(started.url).toContain("state=");
    }
  });

  it("AUTH_SECRET empty → null", () => {
    vi.stubEnv("AUTH_SECRET", "");
    expect(resolveProjectConnectionsAuthSecret()).toBeNull();
  });
});
