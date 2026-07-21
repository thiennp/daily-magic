export const buildAgentWitchHeartbeatAckPayload = (input: {
  readonly installBundleVersion: string;
}): Record<string, unknown> => ({
  installBundleVersion: input.installBundleVersion,
});
