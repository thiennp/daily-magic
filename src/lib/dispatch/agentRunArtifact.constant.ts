export const AGENT_RUN_ARTIFACT_BEGIN = "[[ARTIFACT]]";
export const AGENT_RUN_ARTIFACT_END = "[[/ARTIFACT]]";

export type AgentRunArtifactKind =
  "markdown" | "text" | "file" | "image" | "json" | "table";

export type AgentRunArtifactBlock = {
  readonly kind: AgentRunArtifactKind;
  readonly title: string;
  readonly body: string;
  readonly url?: string;
};
