import { describe, expect, it } from "vitest";

import { buildAgentWitchReviveAwlStatusSection } from "./buildAgentWitchReviveAwlStatusSection";

describe("buildAgentWitchReviveAwlStatusSection", () => {
  it("shows the launchctl kickstart command on macOS", () => {
    const html = buildAgentWitchReviveAwlStatusSection({
      installDir: "/Users/someone/.agent-witch",
      platform: "darwin",
    });
    expect(html).toContain(
      "launchctl kickstart -k &quot;gui/$(id -u)/com.agent-witch&quot;",
    );
    expect(html).toContain("On this computer, open Terminal");
    expect(html).not.toContain("systemctl");
    expect(html).not.toContain("<h3>");
  });

  it("uses the local LaunchAgent prefix for a local install dir", () => {
    const html = buildAgentWitchReviveAwlStatusSection({
      installDir: "/Users/someone/.local-agent-witch/",
      platform: "darwin",
    });
    expect(html).toContain("gui/$(id -u)/com.local-agent-witch&quot;");
    expect(html).toContain("AW_HOME=&quot;$HOME/.local-agent-witch&quot;");
  });

  it("shows the systemd user unit restart on Linux (and WSL)", () => {
    const html = buildAgentWitchReviveAwlStatusSection({
      installDir: "/home/someone/.agent-witch",
      platform: "linux",
    });
    expect(html).toContain("systemctl --user restart agent-witch.service");
    expect(html).not.toContain("launchctl");
    expect(html).not.toMatch(/this Mac/);
  });

  it("lists every OS with escaped labels when the platform is unknown", () => {
    const html = buildAgentWitchReviveAwlStatusSection({
      installDir: "/home/someone/.agent-witch",
      platform: "freebsd",
    });
    expect(html).toContain("<h3>macOS</h3>");
    expect(html).toContain("<h3>Linux or WSL</h3>");
    expect(html).toContain("<h3>Windows (WSL)</h3>");
    expect(html).toContain("add -d &lt;distro name&gt; after wsl.exe");
    expect(html).toContain("this computer's operating system");
  });
});
