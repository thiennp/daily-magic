import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { BOTTOM_NAV } from "@/features/shell/appBottomNav.constant";
import { PRIMARY_NAV } from "@/features/shell/appNav.constant";
import { resolveMarketingFooterProductLinks } from "@/features/marketing/public-api/types";
import { LOGIN_PAGE_COPY } from "@/features/auth/public-api/types";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

describe("COPY-P1 shell and auth labels", () => {
  it("keeps Projects and Marketplace in primary nav without retired top-level entries", () => {
    const labels = PRIMARY_NAV.map((item) => item.label);
    expect(labels).toContain("Projects");
    expect(labels).toContain("Prompt optimizer");
    expect(labels).toContain("Marketplace");
    expect(labels).toContain("Connect");
    expect(labels).toContain("Automations");
    expect(
      PRIMARY_NAV.find((item) => item.label === "Prompt optimizer")?.href,
    ).toBe("/prompt-optimizer");
    expect(PRIMARY_NAV.find((item) => item.label === "Connect")?.href).toBe(
      "#awc-connect",
    );
    expect(labels.indexOf("Marketplace")).toBeLessThan(
      labels.indexOf("Connect"),
    );
    expect(labels.indexOf("Connect")).toBeLessThan(
      labels.indexOf("Automations"),
    );
    expect(labels).not.toContain("My bots");
    expect(labels).not.toContain("Library");
    expect(labels).not.toContain("Reports");
    expect(labels).not.toContain("New task");
    expect(labels).not.toContain("Playbooks");
    expect(labels).not.toContain("Runs");
  });

  it("uses aligned labels in mobile nav destinations (header Menu)", () => {
    const labels = BOTTOM_NAV.map((item) => item.label);
    expect(labels).toEqual([
      "Home",
      "Projects",
      "Marketplace",
      "Prompt optimizer",
    ]);
  });

  it("marketing footer follows the design links (no Send a task)", () => {
    const productLinks = resolveMarketingFooterProductLinks(false);
    expect(productLinks.map((link) => link.label)).toEqual([
      "Real examples",
      "For agents",
      "Reports",
    ]);
    expect(productLinks.some((link) => link.label === "Send a task")).toBe(
      false,
    );
  });

  it("polishes login page title away from autopilot line", () => {
    expect(LOGIN_PAGE_COPY.title).toBe("Sign in to AgentWitch");
    expect(LOGIN_PAGE_COPY.title.includes("autopilot")).toBe(false);
  });

  it("drops New task from the app shell header CTA", () => {
    const source = readFileSync(
      join(process.cwd(), "src/features/shell/AppShellHeader.tsx"),
      "utf8",
    );
    expect(source.includes('aria-label="New task"')).toBe(false);
    expect(source.includes("buildAgentComposerHref")).toBe(false);
    expect(source.includes("Send a task")).toBe(false);
  });

  it("V5-2: app shell header brand has no AWL / bundle pill (I12)", () => {
    const source = readFileSync(
      join(process.cwd(), "src/features/shell/AppShellHeader.tsx"),
      "utf8",
    );
    expect(AGENT_WITCH_PRODUCT_NAME).toBe("AgentWitch");
    expect(
      source.includes("aria-label={`${AGENT_WITCH_PRODUCT_NAME} home`}"),
    ).toBe(true);
    expect(source.includes("Agent Witch")).toBe(false);
    expect(source.includes("AGENT_WITCH_INSTALL_BUNDLE_VERSION")).toBe(false);
    expect(source.includes("AWL")).toBe(false);
  });
});

describe("AgentWitch one-word brand guard", () => {
  it('visible copy constants under src/features/**/**Copy*.ts contain no "Agent Witch"', () => {
    const roots = [join(process.cwd(), "src/features")];
    const offenders: string[] = [];

    const walk = (dir: string): void => {
      for (const name of readdirSync(dir)) {
        const full = join(dir, name);
        const st = statSync(full);
        if (st.isDirectory()) {
          walk(full);
          continue;
        }
        if (!/Copy[^/]*\.ts$/.test(name)) continue;
        if (name.endsWith(".test.ts")) continue;
        const source = readFileSync(full, "utf8");
        if (source.includes("Agent Witch")) {
          offenders.push(full.replace(`${process.cwd()}/`, ""));
        }
      }
    };

    for (const root of roots) {
      walk(root);
    }
    expect(offenders).toEqual([]);
  });
});
