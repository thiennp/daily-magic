import { describe, expect, it } from "vitest";

import {
  AGENT_ACCESS_GLOBAL_REGISTRATIONS_PER_HOUR,
  AGENT_ACCESS_MAX_OPEN_RUNS,
  AGENT_ACCESS_MAX_WORKFLOWS,
  AGENT_ACCESS_MUTATIONS_PER_HOUR,
  AGENT_ACCESS_TOOL_CALLS_PER_HOUR,
} from "@/lib/agentAccess/agentAccess.constant";
import {
  isAgentAccessMutationRateLimited,
  isAgentAccessMutatingTool,
  isAgentAccessRunCapacityFull,
  isAgentAccessToolRateLimited,
  isAgentAccessWorkflowCapacityFull,
} from "@/lib/agentAccess/decideAgentAccessAllowance";
import { isAgentAccessGloballyRateLimited } from "@/lib/agentAccess/agentAccessRateLimit";

describe("agent access abuse gates", () => {
  it("caps registrations, tool calls, mutations, open Runs, and workflows", () => {
    expect(
      isAgentAccessGloballyRateLimited(
        AGENT_ACCESS_GLOBAL_REGISTRATIONS_PER_HOUR,
      ),
    ).toBe(true);
    expect(isAgentAccessGloballyRateLimited(1)).toBe(false);
    expect(isAgentAccessToolRateLimited(AGENT_ACCESS_TOOL_CALLS_PER_HOUR)).toBe(
      true,
    );
    expect(
      isAgentAccessMutationRateLimited(AGENT_ACCESS_MUTATIONS_PER_HOUR),
    ).toBe(true);
    expect(isAgentAccessRunCapacityFull(AGENT_ACCESS_MAX_OPEN_RUNS)).toBe(true);
    expect(isAgentAccessRunCapacityFull(0)).toBe(false);
    expect(isAgentAccessWorkflowCapacityFull(AGENT_ACCESS_MAX_WORKFLOWS)).toBe(
      true,
    );
  });

  it("treats dispatch and install tools as mutations", () => {
    expect(isAgentAccessMutatingTool("send_task")).toBe(true);
    expect(isAgentAccessMutatingTool("run_workflow")).toBe(true);
    expect(isAgentAccessMutatingTool("get_install_command")).toBe(true);
    expect(isAgentAccessMutatingTool("whoami")).toBe(false);
    expect(isAgentAccessMutatingTool("list_macs")).toBe(false);
  });
});
