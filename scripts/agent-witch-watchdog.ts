import { reviveAgentWitchWebSocket } from "./reviveAgentWitchWebSocket";

const formatReviveSummary = (
  targets: Awaited<ReturnType<typeof reviveAgentWitchWebSocket>>["targets"],
): string => {
  const revived = targets.filter((entry) => entry.revived);
  if (revived.length > 0) {
    return revived.map((entry) => entry.launchAgentLabel).join(", ");
  }

  const failures = targets.filter(
    (entry) => entry.reason !== "healthy" && !entry.revived,
  );
  if (failures.length === 0) {
    return "all connections healthy";
  }

  return failures
    .map((entry) => entry.errorMessage ?? entry.launchAgentLabel)
    .join("; ");
};

const main = async (): Promise<void> => {
  const result = await reviveAgentWitchWebSocket();

  if (result.ok) {
    process.stdout.write(
      `[agent-witch-watchdog] ${formatReviveSummary(result.targets)}\n`,
    );
    return;
  }

  process.stderr.write(
    `[agent-witch-watchdog] revive failed: ${formatReviveSummary(result.targets)}\n`,
  );
  process.exit(1);
};

void main();
