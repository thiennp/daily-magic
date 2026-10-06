import { describe, expect, it } from "vitest";

import {
  AGENT_ACCESS_LOCAL_FIRST_BEFORE_CLAUSE,
  AGENT_ACCESS_MCP_INSTRUCTIONS,
  PROJECT_BRIEFING_LOCAL_FIRST_LINE,
} from "@/lib/agentAccess/agentAccessLocalFirstCopy.constant";
import { AGENT_ACCESS_TOOLS } from "@/lib/agentAccess/agentAccessTools.constant";
import { buildAgentAccessGuideline } from "@/lib/agentAccess/buildAgentAccessGuideline";
import { buildAgentAccessLiveGuide } from "@/lib/agentAccess/buildAgentAccessLiveGuide";
import { formatAgentAccessLlmsText } from "@/lib/agentAccess/formatAgentAccessLlmsText";
import { formatProjectBriefingText } from "@/lib/projects/acl/formatProjectBriefingText";
import { PROJECT_UPDATED_WAKE_REPLY_CLAUSE } from "@/lib/projects/acl/projectBriefingHowToDispatch.constant";

const CLOUD_TOOL_NAMES = new Set(AGENT_ACCESS_TOOLS.map((tool) => tool.name));
/** Served by the AWL local MCP, not the cloud catalog. */
const LOCAL_TOOL_NAMES = new Set(["check_context"]);

const toolNamesIn = (text: string): readonly string[] =>
  text.match(/\b[a-z]+(?:_[a-z]+)+\b/g) ?? [];

describe("local-first copy", () => {
  it("instructions follow Safety rules → Library → history → optimizer → send_task", () => {
    const order = [
      "check_context",
      "list_project_skills",
      "list_runs",
      "4. Prompt Optimizer",
      "5. Then send_task",
    ].map((needle) => AGENT_ACCESS_MCP_INSTRUCTIONS.indexOf(needle));
    expect(order.every((index) => index >= 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
  });

  it("names only tools that exist", () => {
    for (const text of [
      AGENT_ACCESS_MCP_INSTRUCTIONS,
      AGENT_ACCESS_LOCAL_FIRST_BEFORE_CLAUSE,
      PROJECT_BRIEFING_LOCAL_FIRST_LINE,
      PROJECT_UPDATED_WAKE_REPLY_CLAUSE,
    ]) {
      for (const name of toolNamesIn(text)) {
        expect(
          CLOUD_TOOL_NAMES.has(name) || LOCAL_TOOL_NAMES.has(name),
          name,
        ).toBe(true);
      }
    }
    expect(PROJECT_UPDATED_WAKE_REPLY_CLAUSE).not.toContain("knowledge list");
  });

  it("send_task and run_workflow carry the before clause", () => {
    for (const name of ["send_task", "run_workflow"]) {
      const tool = AGENT_ACCESS_TOOLS.find((entry) => entry.name === name);
      expect(tool?.description).toContain(AGENT_ACCESS_LOCAL_FIRST_BEFORE_CLAUSE);
    }
  });

  it("guideline and llms.txt mention Safety rules and readable skills", () => {
    const guideline = buildAgentAccessGuideline();
    const headings = guideline.sections.map((section) => section.heading);
    expect(headings).toContain("Local-first before you ask a model");
    expect(headings.indexOf("Local-first before you ask a model")).toBeLessThan(
      headings.indexOf("Optimize your own prompt"),
    );
    const llms = formatAgentAccessLlmsText();
    expect(llms).toContain("Safety rules");
    expect(llms).not.toContain("skill bodies");
    expect(llms).not.toContain("runs, skills, or memory");
    expect(llms).toContain("list_project_skills and get_project_skill");
  });

  it("get_agent_guide cowork tools list the skill tools", () => {
    expect(buildAgentAccessLiveGuide().projectCowork.tools).toEqual(
      expect.arrayContaining([
        "publish_project_skill",
        "list_project_skills",
        "get_project_skill",
        "revoke_project_skill",
      ]),
    );
  });

  it("briefing text ends with the local-first line", () => {
    const text = formatProjectBriefingText({
      projectId: "proj-1",
      projectName: "Demo",
      caller: { projectDisplayName: "Bot", teamLabel: null },
      peers: [],
      howToDispatch: "Dispatch with project_dispatch.",
      playbooks: { boundHarnessSetSlugs: [], note: "no playbooks bound" },
    });
    expect(text.endsWith(PROJECT_BRIEFING_LOCAL_FIRST_LINE)).toBe(true);
    expect(text).toContain("Safety rules");
  });
});
