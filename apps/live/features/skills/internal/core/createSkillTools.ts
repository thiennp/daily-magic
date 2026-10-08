import type { McpTool } from "@agent-witch/shared/mcp";

import {
  SKILLS_FIND_TOOL,
  SKILLS_RUN_TOOL,
} from "./skillToolDefinitions.constant";
import { handleSkillsFind } from "./skillsFindHandler";
import { handleSkillsRun } from "./skillsRunHandler";
import type { SkillToolDeps } from "./skillTools.types";

/** The two MCP tools, ready to join the AWL server's tool list. */
export const createSkillTools = (deps: SkillToolDeps): readonly McpTool[] => [
  { definition: SKILLS_FIND_TOOL, call: handleSkillsFind(deps) },
  { definition: SKILLS_RUN_TOOL, call: handleSkillsRun(deps) },
];
