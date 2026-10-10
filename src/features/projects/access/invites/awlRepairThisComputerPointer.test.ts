import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import ProjectInviteInstructionsBody from "@/features/projects/access/invites/ProjectInviteInstructionsBody";
import { buildProjectInviteJoinPage } from "@/features/projects/access/invites/joinPage/public-api/infrastructure";
import { renderProjectInviteJoinPageMarkdown } from "@/features/projects/access/invites/joinPage/public-api/infrastructure";
import { AGENT_ACCESS_TOOLS } from "@/lib/agentAccess/agentAccessTools.constant";
import { buildAgentAccessGuideline } from "@/lib/agentAccess/buildAgentAccessGuideline";
import { buildAgentAccessLiveGuide } from "@/lib/agentAccess/buildAgentAccessLiveGuide";
import { formatAgentAccessLlmsText } from "@/lib/agentAccess/formatAgentAccessLlmsText";

const URL = "https://www.agentwitch.com/setup/repair-this-computer";
const GUIDELINE =
  "If AgentWitch Local won't start, is too old, or Connect fails, follow https://www.agentwitch.com/setup/repair-this-computer (restart, update, reconnect, check).";
const INSTALL_TOOL =
  "If the computer stays offline or Connect says AgentWitch Local is too old, send your user to https://www.agentwitch.com/setup/repair-this-computer.";
const JOIN =
  "If your user's computer won't connect AgentWitch Local, send them to https://www.agentwitch.com/setup/repair-this-computer.";
/** Link only: no shell commands, scripts, or localhost checks next to the pointer. */
const COMMANDS = /curl|\.sh\b|127\.0\.0\.1|launchctl|systemctl/;

describe("AWL repair pointers (COPY.md awl-hard-fix §6)", () => {
  it("guideline 'Pair this computer' ends with the repair pointer; llms mirror carries it", () => {
    const pair = buildAgentAccessGuideline().sections.find(
      (section) => section.heading === "Pair this computer",
    );
    expect(pair?.body.at(-1)).toBe(GUIDELINE);
    expect(pair?.body.length).toBe(3);
    expect(GUIDELINE).not.toMatch(COMMANDS);
    expect(formatAgentAccessLlmsText()).toContain(
      `## Pair this computer\n\n${pair?.body.join("\n\n")}`,
    );
  });

  it("get_install_command description ends with the repair pointer (tool list and live guide)", () => {
    const tool = AGENT_ACCESS_TOOLS.find(
      (t) => t.name === "get_install_command",
    );
    expect(tool?.description.endsWith(` ${INSTALL_TOOL}`)).toBe(true);
    expect(tool?.description.startsWith("Return a shell command")).toBe(true);
    const live = buildAgentAccessLiveGuide().tools.find(
      (t) => t.name === "get_install_command",
    );
    expect(live?.description).toBe(tool?.description);
    expect(INSTALL_TOOL).not.toMatch(COMMANDS);
  });

  it("/invite/p ends the connect steps with a Repair this computer link", () => {
    const html = renderToStaticMarkup(
      createElement(ProjectInviteInstructionsBody, {
        token: "a".repeat(22),
        hasToken: true,
      }),
    );
    expect(html).toContain(
      `Computer won&#x27;t connect? Follow <a href="${URL}" class="font-medium underline">Repair this computer</a>.</li>`,
    );
    const firstStep = html.slice(html.indexOf("<li>"), html.indexOf("</li>"));
    expect(firstStep).toContain("Repair this computer");
    expect(html).not.toMatch(/\bbot\b/i);
  });

  it("/join '4. Next steps' carries the repair pointer (markdown and JSON)", () => {
    const page = buildProjectInviteJoinPage({
      token: "tok-fake-invite-0000",
      projectId: "proj-fake",
      projectName: "Demo Project",
      autoApprove: null,
    });
    expect(page.nextSteps).toContain(JOIN);
    const markdown = renderProjectInviteJoinPageMarkdown(page);
    const next = markdown.slice(markdown.indexOf("## 4. Next steps"));
    expect(next).toContain(`\n${JOIN}\n`);
    expect(next.indexOf(JOIN)).toBeGreaterThan(
      next.indexOf("9. Product updates"),
    );
    expect(JOIN).not.toMatch(COMMANDS);
  });
});
