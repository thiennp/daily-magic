export const buildAgentWitchHeartbeatAckPayload = (input: {
  readonly installBundleVersion: string;
  readonly pendingAccountLink: Readonly<Record<string, unknown>> | null;
}): Record<string, unknown> => {
  const payload: Record<string, unknown> = {
    installBundleVersion: input.installBundleVersion,
  };

  if (input.pendingAccountLink !== null) {
    payload.pendingAccountLink = input.pendingAccountLink;
  }

  return payload;
};
