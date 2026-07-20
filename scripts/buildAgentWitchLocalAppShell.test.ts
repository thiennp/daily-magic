import { describe, expect, it } from "vitest";

import { buildAgentWitchLocalAppShell } from "./buildAgentWitchLocalAppShell";

describe("buildAgentWitchLocalAppShell", () => {
  it("uses Outfit + zinc marketing shell for local UI (AGENT-026)", () => {
    const html = buildAgentWitchLocalAppShell({
      title: "Status",
      activePath: "/",
      body: '<div class="card">ok</div>',
    });

    expect(html).toContain("family=Outfit");
    expect(html).toContain("--aw-zinc-900: #18181b");
    expect(html).toContain('class="site-header"');
    expect(html).toContain('aria-current="page"');
    expect(html).toContain("Agent Witch");
    expect(html).toContain('href="/"');
    expect(html).toContain('href="/traffic"');
    expect(html).toContain('href="/knowledge"');
  });

  it("marks the active nav path (AGENT-026)", () => {
    const html = buildAgentWitchLocalAppShell({
      title: "Traffic",
      activePath: "/traffic",
      body: "",
    });

    expect(html).toContain('href="/traffic" aria-current="page"');
    expect(html).not.toMatch(/href="\/"[^>]*aria-current/);
  });

  it("shows install bundle version in the header (AGENT-041)", () => {
    const html = buildAgentWitchLocalAppShell({
      title: "Status",
      activePath: "/",
      body: '<div class="card">ok</div>',
      installVersion: {
        bundleVersion: "34",
        appOrigin: "https://app.example.com",
        updatedAt: "2026-07-19T10:00:00.000Z",
      },
    });

    expect(html).toContain('class="brand-version"');
    expect(html).toContain("bundle 34");
    expect(html).toContain('title="Updated 2026-07-19T10:00:00.000Z"');
  });

  it("falls back to unknown bundle version when install metadata is missing", () => {
    const html = buildAgentWitchLocalAppShell({
      title: "Status",
      activePath: "/",
      body: "",
    });

    expect(html).toContain("bundle unknown");
  });
});
