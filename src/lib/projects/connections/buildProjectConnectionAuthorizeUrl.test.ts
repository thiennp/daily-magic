import { describe, expect, it } from "vitest";

import {
  buildProjectConnectionAuthorizeUrl,
  formatProviderOAuthScopeParam,
} from "@/lib/projects/connections/buildProjectConnectionAuthorizeUrl";
import type { ProviderOAuthConfig } from "@/lib/projects/connections/getProviderOAuthConfig";

describe("formatProviderOAuthScopeParam", () => {
  it("joins Linear scopes with commas", () => {
    expect(formatProviderOAuthScopeParam("linear", ["read", "write"])).toBe(
      "read,write",
    );
  });

  it("joins other providers with spaces", () => {
    expect(
      formatProviderOAuthScopeParam("gmail", [
        "https://www.googleapis.com/auth/gmail.readonly",
        "https://www.googleapis.com/auth/gmail.send",
      ]),
    ).toBe(
      "https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send",
    );
    expect(
      formatProviderOAuthScopeParam("github", ["read:user", "repo"]),
    ).toBe("read:user repo");
  });
});

describe("buildProjectConnectionAuthorizeUrl", () => {
  it("builds Linear authorize URL with comma scopes and response_type", () => {
    const config: ProviderOAuthConfig = {
      provider: "linear",
      clientId: "lin-client",
      clientSecret: "secret",
      authorizeUrl: "https://linear.app/oauth/authorize",
      tokenUrl: "https://api.linear.app/oauth/token",
      scopes: ["read", "write"],
      phase: 1,
    };
    const url = new URL(
      buildProjectConnectionAuthorizeUrl({ config, state: "st" }),
    );
    expect(url.searchParams.get("scope")).toBe("read,write");
    expect(url.searchParams.get("response_type")).toBe("code");
    expect(url.searchParams.get("client_id")).toBe("lin-client");
    expect(url.searchParams.get("state")).toBe("st");
    expect(url.searchParams.get("redirect_uri")).toContain(
      "/api/oauth/project-connections/callback",
    );
  });

  it("builds Gmail authorize URL with offline access + consent", () => {
    const config: ProviderOAuthConfig = {
      provider: "gmail",
      clientId: "google-client",
      clientSecret: "secret",
      authorizeUrl: "https://accounts.google.com/o/oauth2/v2/auth",
      tokenUrl: "https://oauth2.googleapis.com/token",
      scopes: [
        "https://www.googleapis.com/auth/gmail.readonly",
        "https://www.googleapis.com/auth/gmail.send",
      ],
      phase: 1,
    };
    const url = new URL(
      buildProjectConnectionAuthorizeUrl({ config, state: "st" }),
    );
    expect(url.searchParams.get("access_type")).toBe("offline");
    expect(url.searchParams.get("prompt")).toBe("consent");
    expect(url.searchParams.get("response_type")).toBe("code");
    expect(url.searchParams.get("scope")).toContain("gmail.readonly");
    expect(url.searchParams.get("scope")).toContain("gmail.send");
  });

  it("builds Notion authorize URL with owner=user and no scope param", () => {
    const config: ProviderOAuthConfig = {
      provider: "notion",
      clientId: "notion-client",
      clientSecret: "secret",
      authorizeUrl: "https://api.notion.com/v1/oauth/authorize",
      tokenUrl: "https://api.notion.com/v1/oauth/token",
      scopes: ["read_content", "update_content"],
      phase: 1,
    };
    const url = new URL(
      buildProjectConnectionAuthorizeUrl({ config, state: "st" }),
    );
    expect(url.searchParams.get("owner")).toBe("user");
    expect(url.searchParams.get("response_type")).toBe("code");
    expect(url.searchParams.get("client_id")).toBe("notion-client");
    expect(url.searchParams.has("scope")).toBe(false);
  });

  it("builds Google Drive authorize URL with drive.file + offline consent", () => {
    const config: ProviderOAuthConfig = {
      provider: "google_drive",
      clientId: "google-client",
      clientSecret: "secret",
      authorizeUrl: "https://accounts.google.com/o/oauth2/v2/auth",
      tokenUrl: "https://oauth2.googleapis.com/token",
      scopes: ["https://www.googleapis.com/auth/drive.file"],
      phase: 1,
    };
    const url = new URL(
      buildProjectConnectionAuthorizeUrl({ config, state: "st" }),
    );
    expect(url.searchParams.get("access_type")).toBe("offline");
    expect(url.searchParams.get("prompt")).toBe("consent");
    expect(url.searchParams.get("response_type")).toBe("code");
    expect(url.searchParams.get("scope")).toBe(
      "https://www.googleapis.com/auth/drive.file",
    );
  });
});
