export const resolveWakeIdentityPortsToProbe = (input: {
  readonly allPorts: readonly number[];
  readonly attemptedPorts: ReadonlySet<number>;
  readonly probeSuppressed: boolean;
}): readonly number[] => {
  const pending = input.allPorts.filter(
    (port) => !input.attemptedPorts.has(port),
  );

  if (pending.length > 0) {
    return pending;
  }

  if (input.probeSuppressed) {
    return [];
  }

  return [];
};
