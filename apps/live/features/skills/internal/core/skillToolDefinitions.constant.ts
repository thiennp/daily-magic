import type { McpToolDefinition } from "@agent-witch/shared/mcp";

export const SKILLS_FIND_TOOL_NAME = "skills_find";
export const SKILLS_RUN_TOOL_NAME = "skills_run";

const CWD_PROPERTY = {
  type: "string",
  description: "Current working directory (selects the project). Optional.",
} as const;

export const SKILLS_FIND_TOOL: McpToolDefinition = {
  name: SKILLS_FIND_TOOL_NAME,
  description:
    "Find saved project skills that fit a task. Returns the best few as {skillId, name, description, score}. Skills are optional.",
  inputSchema: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "Short description of the task.",
      },
      k: {
        type: "number",
        description: "How many skills to return (default 5, max 20).",
      },
      cwd: CWD_PROPERTY,
    },
    required: ["query"],
  },
};

export const SKILLS_RUN_TOOL: McpToolDefinition = {
  name: SKILLS_RUN_TOOL_NAME,
  description:
    "Load a skill found with skills_find and follow it. Returns the skill's instructions.",
  inputSchema: {
    type: "object",
    properties: {
      skill: { type: "string", description: "The skillId from skills_find." },
      params: {
        type: "object",
        description: "Optional values for the skill's inputs.",
      },
      cwd: CWD_PROPERTY,
    },
    required: ["skill"],
  },
};
