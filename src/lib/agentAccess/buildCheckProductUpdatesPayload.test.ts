import { describe, expect, it, vi } from "vitest";

import {
  buildCheckProductUpdatesPayload,
  filterProductConnectUpdatesSince,
} from "@/lib/agentAccess/buildCheckProductUpdatesPayload";
import { parseCheckProductUpdatesArgs } from "@/lib/agentAccess/parseCheckProductUpdatesArgs";
import {
  PRODUCT_CONNECT_UPDATES,
  PRODUCT_CONNECT_UPDATES_CATALOG_VERSION,
} from "@/lib/agentAccess/productConnectUpdates.constant";

describe("check_product_updates filtering", () => {
  it("returns all entries when sinceCatalogVersion is 0", () => {
    const entries = filterProductConnectUpdatesSince(0);
    expect(entries).toHaveLength(PRODUCT_CONNECT_UPDATES.length);
    expect(entries[0]?.id).toBe("invite-redeem-mcp-first");
  });

  it("filters to entries newer than sinceCatalogVersion", () => {
    const mid = 5;
    const entries = filterProductConnectUpdatesSince(mid);
    expect(entries.every((e) => e.catalogVersion > mid)).toBe(true);
    expect(entries.some((e) => e.id === "check-product-updates")).toBe(true);
    expect(entries.some((e) => e.id === "rotate-key-keep-mcp-bearer")).toBe(
      false,
    );
  });

  it("returns empty when since equals current catalog version", () => {
    expect(
      filterProductConnectUpdatesSince(PRODUCT_CONNECT_UPDATES_CATALOG_VERSION),
    ).toHaveLength(0);
  });

  it("buildCheckProductUpdatesPayload sets hasUpdates and catalogVersion", () => {
    vi.stubEnv("RAILWAY_GIT_COMMIT_SHA", "abcdef1234567890");
    const withUpdates = buildCheckProductUpdatesPayload({
      sinceCatalogVersion: 0,
    });
    expect(withUpdates.ok).toBe(true);
    expect(withUpdates.catalogVersion).toBe(
      PRODUCT_CONNECT_UPDATES_CATALOG_VERSION,
    );
    expect(withUpdates.hasUpdates).toBe(true);
    expect(withUpdates.entries.length).toBeGreaterThan(0);
    expect(withUpdates.connect.mcpBearer).toBe("agent-access");
    expect(withUpdates.connect.projectScopedKeyMcpAuth).toBe(false);
    expect(
      withUpdates.tools.some((t) => t.name === "check_product_updates"),
    ).toBe(true);
    expect(withUpdates.tipSha).toBe("abcdef1");
    expect(withUpdates.adaptHint).toMatch(/keep agent-access Bearer/i);

    const none = buildCheckProductUpdatesPayload({
      sinceCatalogVersion: PRODUCT_CONNECT_UPDATES_CATALOG_VERSION,
    });
    expect(none.hasUpdates).toBe(false);
    expect(none.entries).toHaveLength(0);
    vi.unstubAllEnvs();
  });

  it("omits tipSha when release env is unset", () => {
    vi.stubEnv("RAILWAY_GIT_COMMIT_SHA", "");
    vi.stubEnv("VERCEL_GIT_COMMIT_SHA", "");
    vi.stubEnv("GITHUB_SHA", "");
    const payload = buildCheckProductUpdatesPayload({ sinceCatalogVersion: 0 });
    expect(payload.tipSha).toBeUndefined();
    vi.unstubAllEnvs();
  });
});

describe("parseCheckProductUpdatesArgs", () => {
  it("defaults missing or invalid since to 0", () => {
    expect(parseCheckProductUpdatesArgs(undefined).sinceCatalogVersion).toBe(0);
    expect(parseCheckProductUpdatesArgs({}).sinceCatalogVersion).toBe(0);
    expect(
      parseCheckProductUpdatesArgs({ sinceCatalogVersion: -1 })
        .sinceCatalogVersion,
    ).toBe(0);
  });

  it("accepts number or numeric string", () => {
    expect(
      parseCheckProductUpdatesArgs({ sinceCatalogVersion: 3 })
        .sinceCatalogVersion,
    ).toBe(3);
    expect(
      parseCheckProductUpdatesArgs({ sinceCatalogVersion: "7" })
        .sinceCatalogVersion,
    ).toBe(7);
  });
});
