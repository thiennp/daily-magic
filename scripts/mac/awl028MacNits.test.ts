import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const read = (relative: string): string =>
  readFileSync(join(process.cwd(), "apps/mac", relative), "utf8");

const popover = read("Sources/AgentWitchLocal/MacAppMenuBarContentView.swift");
const window = read("Sources/AgentWitchLocal/Views/MacAppMainWindowView.swift");

describe("279e425f: AWL 0.2.8 Mac nits", () => {
  it("labels popover and window buttons for VoiceOver", () => {
    expect(popover).toContain(".accessibilityLabel(title)");
    expect(popover).toContain('.accessibilityHint("Shortcut \\(shortcut)")');
    expect(popover).toContain('.accessibilityLabel("Switch account")');
    expect(popover).toContain(
      '.accessibilityLabel("Status: \\(chrome.pillLabel)")',
    );
    expect(window).toContain(
      ".accessibilityLabel(sidebarRowAccessibilityLabel(title: item.title, badge: sidebarBadge(for: item)))",
    );
    expect(window).toContain(
      '.accessibilityLabel("Account: \\(accountFirstName)")',
    );
    expect(window).toContain(
      '.accessibilityLabel("Status: \\(chrome.pillLabel)")',
    );
  });

  it("shows History 'Offline' only when this computer is offline", () => {
    expect(window).not.toContain('Text("Offline")');
    expect(window).toContain(
      "resolveHistorySidebarBadge(chromeKind: chrome.kind, isOffline: controller.isOfflineStub)",
    );
  });

  it("closes the popover after Open window / Settings", () => {
    expect(popover).toMatch(
      /presenter\.present\(pageRawValue: page\.rawValue\)\s*\n\s*\/\/[^\n]*\n\s*Task \{ @MainActor in dismissMenuBarExtraPopover\(\) \}/,
    );
    expect(popover).toContain("isMenuBarExtraWindowClassName(");
  });

  it("never shows the raw Agt-… agent id as the account name", () => {
    expect(popover).toContain("LocalAccountName.displayName(");
    expect(window).toContain("LocalAccountName.firstName(");
    const stubs = read(
      "Sources/AgentWitchLocal/MacAppMenuController+ChromeStubs.swift",
    );
    expect(stubs).toContain(
      "LocalAccountName.displayName(email: email, preferredName: chromeDisplayName)",
    );
    const core = read(
      "Sources/AgentWitchLocalCore/Chrome/LocalAccountName.swift",
    );
    expect(core).toContain(
      'syntheticAgentEmailDomain = "agents.agentwitch.com"',
    );
    const tests = read(
      "Tests/AgentWitchLocalCoreTests/AWL028ChromeNitsTests.swift",
    );
    expect(tests).toContain('"AgentWitch agent"');
  });
});
