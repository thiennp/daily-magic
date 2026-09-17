import { describe, expect, it } from "vitest";

import { buildAgentWitchLocalAppShell } from "./buildAgentWitchLocalAppShell";

describe("buildAgentWitchLocalAppShell", () => {
  it("uses Outfit + zinc marketing shell for local UI (AGENT-026)", () => {
    const html = buildAgentWitchLocalAppShell({
      title: "Status",
      activePath: "/",
      cloudAppOrigin: "https://www.agentwitch.com",
      headerUpdateButtonHtml:
        '<form class="header-update-form" method="POST" action="/api/update"><button class="btn btn-primary btn-compact" type="submit">Update</button></form>',
      body: '<div class="card">ok</div>',
    });

    expect(html).toContain("family=Outfit");
    expect(html).toContain("--aw-zinc-900: #18181b");
    expect(html).toContain('class="site-header"');
    expect(html).toContain('aria-current="page"');
    expect(html).toContain("Agent Witch");
    expect(html).toContain('href="/"');
    expect(html).toContain('href="/task"');
    expect(html).toContain('href="/status"');
    expect(html).toContain('href="/traffic"');
    expect(html).toContain('href="/knowledge"');
    expect(html).toContain('href="/projects"');
    expect(html).toContain('href="/harness"');
    expect(html).toContain('href="https://www.agentwitch.com"');
    expect(html).toContain("Open cloud");
  });

  it("orders nav by importance: task and status before diagnostics", () => {
    const html = buildAgentWitchLocalAppShell({
      title: "Home",
      activePath: "/",
      cloudAppOrigin: "https://www.agentwitch.com",
      body: "",
    });

    const taskIndex = html.indexOf('href="/task"');
    const statusIndex = html.indexOf('href="/status"');
    const projectsIndex = html.indexOf('href="/projects"');
    const harnessIndex = html.indexOf('href="/harness"');
    const errorsIndex = html.indexOf('href="/errors"');
    const trafficIndex = html.indexOf('href="/traffic"');

    expect(taskIndex).toBeLessThan(statusIndex);
    expect(statusIndex).toBeLessThan(projectsIndex);
    expect(projectsIndex).toBeLessThan(harnessIndex);
    expect(harnessIndex).toBeLessThan(errorsIndex);
    expect(errorsIndex).toBeLessThan(trafficIndex);
  });

  it("marks the active nav path (AGENT-026)", () => {
    const html = buildAgentWitchLocalAppShell({
      title: "Traffic",
      activePath: "/traffic",
      cloudAppOrigin: "https://www.agentwitch.com",
      body: "",
    });

    expect(html).toContain('href="/traffic" aria-current="page"');
    expect(html).not.toMatch(/href="\/"[^>]*aria-current/);
  });

  it("shows install bundle version after LOCAL in the header brand", () => {
    const html = buildAgentWitchLocalAppShell({
      title: "Status",
      activePath: "/",
      cloudAppOrigin: "https://www.agentwitch.com",
      installBundleVersionLabel: "111",
      body: '<div class="card">ok</div>',
    });

    expect(html).toContain('class="brand-sub">Local(111)</span>');
    expect(html).toContain("install bundle 111");
  });

  it("falls back to unknown when install bundle version is missing", () => {
    const html = buildAgentWitchLocalAppShell({
      title: "Status",
      activePath: "/",
      cloudAppOrigin: "https://www.agentwitch.com",
      body: "",
    });

    expect(html).toContain('class="brand-sub">Local(unknown)</span>');
  });
});
