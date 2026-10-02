import { buildCheckProductUpdatesPayload } from "@/lib/agentAccess/buildCheckProductUpdatesPayload";
import type { AgentAccessToolCallResult } from "@/lib/agentAccess/handleAgentAccessMcpRequest";
import { parseCheckProductUpdatesArgs } from "@/lib/agentAccess/parseCheckProductUpdatesArgs";
import { agentAccessTextResult } from "@/lib/agentAccess/requireAgentAccessActor";

export const executeCheckProductUpdatesTool = (
  args: unknown,
): AgentAccessToolCallResult => {
  const parsed = parseCheckProductUpdatesArgs(args);
  return agentAccessTextResult(
    buildCheckProductUpdatesPayload({
      sinceCatalogVersion: parsed.sinceCatalogVersion,
    }),
  );
};
