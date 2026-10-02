import { AGENT_ACCESS_TOOLS } from "@/lib/agentAccess/agentAccessTools.constant";
import {
  AGENT_ACCESS_BODY_MAX_BYTES,
  AGENT_ACCESS_FEEDBACK_PER_HOUR,
  AGENT_ACCESS_MAX_OPEN_RUNS,
  AGENT_ACCESS_MAX_WORKFLOWS,
  AGENT_ACCESS_MUTATIONS_PER_HOUR,
  AGENT_ACCESS_TOOL_CALLS_PER_HOUR,
} from "@/lib/agentAccess/agentAccess.constant";
import { AGENT_WITCH_ROLE_LIVE_GUIDE } from "@/lib/agentAccess/buildAgentWitchRoleGuidelineSection";
import { buildPromptSdlcAgentGuide } from "@/lib/agentAccess/buildPromptSdlcAgentGuide";
import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";

export const buildAgentAccessLiveGuide = () => {
  const urls = buildAgentAccessUrls();

  return {
    origin: urls.origin,
    guidelineUrl: urls.guidelineUrl,
    llmsUrl: `${urls.origin}/llms.txt`,
    registerUrl: urls.registerUrl,
    invokeUrl: urls.invokeUrl,
    mcpUrl: urls.mcpUrl,
    discoveryUrl: urls.discoveryUrl,
    tools: AGENT_ACCESS_TOOLS.map((tool) => ({
      name: tool.name,
      description: tool.description,
    })),
    limits: {
      toolCallsPerHour: AGENT_ACCESS_TOOL_CALLS_PER_HOUR,
      mutationsPerHour: AGENT_ACCESS_MUTATIONS_PER_HOUR,
      feedbackPerHour: AGENT_ACCESS_FEEDBACK_PER_HOUR,
      maxOpenRuns: AGENT_ACCESS_MAX_OPEN_RUNS,
      maxWorkflows: AGENT_ACCESS_MAX_WORKFLOWS,
      maxBodyBytes: AGENT_ACCESS_BODY_MAX_BYTES,
    },
    whatAgentWitchIs: AGENT_WITCH_ROLE_LIVE_GUIDE,
    promptSdlc: buildPromptSdlcAgentGuide(),
    projectCowork: {
      awcStoresOnly: ["name", "folderRefs", "repoUrls", "defaultBranch", "members", "approveRevokeAudit"],
      coordination: "local_or_git_or_bot_oob",
      ownerApproveRevokeUiOnly: true,
      noTokenSharing: true,
      tools: [
        "request_project_access",
        "get_my_project_access",
        "list_projects",
        "get_project_acl",
        "check_membership",
        "mint_allow_claim",
        "list_project_peers",
        "project_dispatch",
        "list_project_inbox",
        "rotate_project_api_key",
      ],
    },
    teachOtherBots: {
      instruction:
        "You may expose Agent Witch as your own tool use_agent_witch and point at the public guideline. Do not look up or publish another person's account.",
      toolName: "use_agent_witch",
      readFirst: [urls.guidelineUrl, `${urls.origin}/llms.txt`],
      register: {
        method: "POST",
        url: urls.registerUrl,
        body: { method: "none", displayName: "your bot name" },
      },
      invoke: {
        method: "POST",
        url: urls.invokeUrl,
        headers: { Authorization: "Bearer <token>" },
        body: { name: "<tool>", arguments: {} },
      },
    },
  };
};
