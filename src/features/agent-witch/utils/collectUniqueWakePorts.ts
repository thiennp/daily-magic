export const collectUniqueWakePorts = (
  wakePorts: readonly (number | null | undefined)[],
): readonly number[] => {
  const seen = new Set<number>();

  wakePorts.forEach((wakePort) => {
    if (
      wakePort !== null &&
      wakePort !== undefined &&
      Number.isInteger(wakePort) &&
      wakePort > 0 &&
      wakePort <= 65_535 &&
      !seen.has(wakePort)
    ) {
      seen.add(wakePort);
    }
  });

  return [...seen];
};
