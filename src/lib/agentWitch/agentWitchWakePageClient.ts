import { resolveAgentWitchWakeBaseUrlForPage } from "@/lib/agentWitch/resolveAgentWitchWakeBaseUrl";

export const canRequestLocalAgentWitchApi = (): boolean =>
  typeof window !== "undefined";

export { resolveAgentWitchWakeBaseUrlForPage };
