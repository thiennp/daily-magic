import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AwlRepairManuallyPanel from "./AwlRepairManuallyPanel";

const render = (operatingSystem: string): string =>
  renderToStaticMarkup(
    createElement(AwlRepairManuallyPanel, {
      operatingSystem,
      hostname: "www.agentwitch.com",
    }),
  );

const decode = (html: string): string =>
  html
    .replaceAll("&#x27;", "'")
    .replaceAll("&quot;", '"')
    .replaceAll("&amp;", "&");

describe("AwlRepairManuallyPanel render", () => {
  it("renders the locked title, intro, four steps and Copy", () => {
    const html = decode(render("mac"));
    expect(html).toContain(">Repair manually<");
    expect(html).toContain(
      "Run these steps in Terminal on this computer. Start at step 1 and stop once the check works.",
    );
    for (const text of [
      "Restart AgentWitch Local",
      "Update AgentWitch Local",
      "Keeps this computer linked to your account. If it can't find the link, go to step 3.",
      "Reconnect this computer",
      "Only if step 2 didn't help. On Home, choose Connect this computer and run the command it shows.",
      "Check it works",
      "If you see a reply, AgentWitch Local is running. Then refresh Home.",
      "launchctl kickstart",
      "curl -fsSL https://www.agentwitch.com/install/agent-witch-update.sh | bash",
      "curl -sS -m 5 http://127.0.0.1:43347/health",
    ]) {
      expect(html).toContain(text);
    }
    expect(html.match(/>Copy</g)).toHaveLength(3);
    expect(html.match(/data-repair-step=/g)).toHaveLength(4);
    // Footer deferred until the Repair this computer page is live (no dead links).
    expect(html).not.toMatch(/Still stuck|repair-this-computer|<a /);
  });

  it("shows the Linux revive block on a Linux browser", () => {
    const html = render("linux");
    expect(html).toContain("systemctl --user restart agent-witch.service");
    expect(html).not.toContain("launchctl kickstart");
  });

  it("v1 does not poll health (static steps, no success/fail state)", () => {
    const dir = dirname(fileURLToPath(import.meta.url));
    for (const name of [
      "AwlRepairManuallyPanel.tsx",
      "buildAwlRepairManuallySteps.ts",
    ]) {
      const source = readFileSync(join(dir, name), "utf8");
      expect(source).not.toMatch(/fetch\(|setInterval|useEffect|useQuery/);
    }
  });
});
