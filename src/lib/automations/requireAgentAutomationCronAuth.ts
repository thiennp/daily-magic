export const readAgentAutomationCronSecret = (): string | null => {
  const configuredSecrets = [
    process.env.AGENT_AUTOMATION_CRON_SECRET,
    process.env.CRON_SECRET,
  ]
    .map((value) => value?.trim() ?? "")
    .filter((value) => value.length > 0);

  return configuredSecrets[0] ?? null;
};

const readAcceptedCronSecrets = (): readonly string[] => {
  const secrets = new Set<string>();

  for (const value of [
    process.env.AGENT_AUTOMATION_CRON_SECRET,
    process.env.CRON_SECRET,
  ]) {
    const trimmed = value?.trim() ?? "";

    if (trimmed.length > 0) {
      secrets.add(trimmed);
    }
  }

  return [...secrets];
};

export const isAuthorizedAgentAutomationCronRequest = (
  request: Request,
): boolean => {
  const configuredSecrets = readAcceptedCronSecrets();

  if (configuredSecrets.length === 0) {
    return false;
  }

  const authorization = request.headers.get("authorization")?.trim() ?? "";
  const bearerSecret = authorization.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length).trim()
    : "";
  const headerSecret =
    request.headers.get("x-agent-automation-cron-secret")?.trim() ?? "";

  return configuredSecrets.some(
    (secret) => bearerSecret === secret || headerSecret === secret,
  );
};
