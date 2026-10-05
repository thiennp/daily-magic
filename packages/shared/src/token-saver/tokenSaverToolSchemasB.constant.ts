const stringProp = (description: string) =>
  ({ type: "string" as const, description });

export const GET_SKILL_TOOL_SCHEMA = {
  name: "get_skill" as const,
  description:
    "Read one project skill by id or search. Same idea as the cloud skill tools.",
  inputSchema: {
    type: "object" as const,
    properties: {
      projectId: stringProp("Project id."),
      skillId: stringProp("Skill id when known."),
      q: stringProp("Optional search text."),
    },
    required: ["projectId"] as const,
    additionalProperties: false as const,
  },
} as const;

export const RECORD_OUTCOME_TOOL_SCHEMA = {
  name: "record_outcome" as const,
  description:
    "Record whether a tip or preflight check helped. Pitfall wins call the cloud hit route.",
  inputSchema: {
    type: "object" as const,
    properties: {
      projectId: stringProp("Project id."),
      kind: {
        type: "string" as const,
        description: "pitfall | preflight | other",
      },
      pitfallId: stringProp("Pitfall id when kind is pitfall."),
      preflightId: stringProp("Preflight check id when kind is preflight."),
      ok: { type: "boolean" as const, description: "Whether the step helped." },
      notes: stringProp("Optional short note. No secret values."),
    },
    required: ["projectId", "kind", "ok"] as const,
    additionalProperties: false as const,
  },
} as const;
