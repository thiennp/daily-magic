export const buildAgentRunsQueryString = (input: {
  readonly status?: string;
  readonly scope?: string;
  readonly groupId?: string;
}): string => {
  const params = new URLSearchParams();

  if (input.status !== undefined && input.status.length > 0) {
    params.set("status", input.status);
  }
  if (input.scope !== undefined && input.scope.length > 0) {
    params.set("scope", input.scope);
  }
  if (input.groupId !== undefined && input.groupId.length > 0) {
    params.set("groupId", input.groupId);
  }

  const query = params.toString();
  return query.length > 0 ? `?${query}` : "";
};
