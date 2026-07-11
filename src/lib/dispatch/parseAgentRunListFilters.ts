import {
  AgentRunScope,
  isAgentRunScope,
} from "@/lib/dispatch/AgentRunScope.constant";
import { isAgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type { AgentRunScopeValue } from "@/lib/dispatch/AgentRunScope.constant";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";
import { listGroupsForMember } from "@/lib/auth/listGroupsForMember";

export interface ParsedAgentRunListFilters {
  readonly status?: AgentRunStatusValue;
  readonly scope: AgentRunScopeValue;
  readonly groupId?: string;
  readonly forbidden?: boolean;
}

export async function parseAgentRunListFilters(
  userId: string,
  request: Request,
): Promise<ParsedAgentRunListFilters> {
  const url = new URL(request.url);
  const statusParam = url.searchParams.get("status");
  const scopeParam = url.searchParams.get("scope");
  const groupIdParam = url.searchParams.get("groupId");

  const status =
    statusParam !== null && isAgentRunStatus(statusParam)
      ? statusParam
      : undefined;
  const scope =
    scopeParam !== null && isAgentRunScope(scopeParam)
      ? scopeParam
      : AgentRunScope.ALL;

  if (
    scope === AgentRunScope.GROUP &&
    groupIdParam !== null &&
    groupIdParam.length > 0
  ) {
    const groups = await listGroupsForMember(userId);
    if (!groups.some((group) => group.id === groupIdParam)) {
      return { status, scope, forbidden: true };
    }

    return { status, scope, groupId: groupIdParam };
  }

  return { status, scope };
}
