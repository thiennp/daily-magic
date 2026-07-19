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
});
