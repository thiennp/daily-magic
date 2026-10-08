import { afterEach, describe, expect, it } from "vitest";

import { getProviderOAuthConfig } from "@/lib/projects/connections/getProviderOAuthConfig";

const KEYS = [
  "PROJECT_CONNECTIONS_LINEAR_CLIENT_ID",
  "PROJECT_CONNECTIONS_LINEAR_CLIENT_SECRET",
  "PROJECT_CONNECTIONS_GOOGLE_CLIENT_ID",
  "PROJECT_CONNECTIONS_GOOGLE_CLIENT_SECRET",
  "PROJECT_CONNECTIONS_NOTION_CLIENT_ID",
  "PROJECT_CONNECTIONS_NOTION_CLIENT_SECRET",
] as const;

describe("getProviderOAuthConfig P2 + Notion/Drive", () => {
  const saved: Record<string, string | undefined> = {};

  afterEach(() => {
    for (const key of KEYS) {
      if (saved[key] === undefined) delete process.env[key];
      else process.env[key] = saved[key];
      delete saved[key];
    }
  });

  const stash = (key: (typeof KEYS)[number], value: string | undefined) => {
    saved[key] = process.env[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  };

  it("returns null for Linear/Gmail/Notion/Drive when env is missing", () => {
    for (const key of KEYS) stash(key, undefined);
    expect(getProviderOAuthConfig("linear")).toBeNull();
    expect(getProviderOAuthConfig("gmail")).toBeNull();
    expect(getProviderOAuthConfig("notion")).toBeNull();
    expect(getProviderOAuthConfig("google_drive")).toBeNull();
  });

  it("returns phase-1 Linear config with read+write when env is set", () => {
    stash("PROJECT_CONNECTIONS_LINEAR_CLIENT_ID", "lin-id");
    stash("PROJECT_CONNECTIONS_LINEAR_CLIENT_SECRET", "lin-secret");
    const cfg = getProviderOAuthConfig("linear");
    expect(cfg).not.toBeNull();
    expect(cfg?.phase).toBe(1);
    expect(cfg?.scopes).toEqual(["read", "write", "admin"]);
    expect(cfg?.authorizeUrl).toContain("linear.app");
  });

  it("returns phase-1 Gmail config with least-privilege read+send scopes", () => {
    stash("PROJECT_CONNECTIONS_GOOGLE_CLIENT_ID", "g-id");
    stash("PROJECT_CONNECTIONS_GOOGLE_CLIENT_SECRET", "g-secret");
    const cfg = getProviderOAuthConfig("gmail");
    expect(cfg).not.toBeNull();
    expect(cfg?.phase).toBe(1);
    expect(cfg?.scopes).toEqual([
      "https://www.googleapis.com/auth/gmail.readonly",
      "https://www.googleapis.com/auth/gmail.send",
    ]);
    expect(cfg?.scopes.some((s) => s.includes("mail.google.com"))).toBe(false);
  });

  it("returns Notion public OAuth config with portal capability labels", () => {
    stash("PROJECT_CONNECTIONS_NOTION_CLIENT_ID", "n-id");
    stash("PROJECT_CONNECTIONS_NOTION_CLIENT_SECRET", "n-secret");
    const cfg = getProviderOAuthConfig("notion");
    expect(cfg).not.toBeNull();
    expect(cfg?.phase).toBe(1);
    expect(cfg?.authorizeUrl).toBe("https://api.notion.com/v1/oauth/authorize");
    expect(cfg?.tokenUrl).toBe("https://api.notion.com/v1/oauth/token");
    expect(cfg?.scopes).toEqual(["read_content", "update_content"]);
  });

  it("returns Google Drive config on same Google client with drive.file only", () => {
    stash("PROJECT_CONNECTIONS_GOOGLE_CLIENT_ID", "g-id");
    stash("PROJECT_CONNECTIONS_GOOGLE_CLIENT_SECRET", "g-secret");
    const cfg = getProviderOAuthConfig("google_drive");
    expect(cfg).not.toBeNull();
    expect(cfg?.phase).toBe(1);
    expect(cfg?.clientId).toBe("g-id");
    expect(cfg?.scopes).toEqual(["https://www.googleapis.com/auth/drive.file"]);
    expect(
      cfg?.scopes.some(
        (s) => s.endsWith("/drive") || s.includes("drive.readonly"),
      ),
    ).toBe(false);
  });
});
