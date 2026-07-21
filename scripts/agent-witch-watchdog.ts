import { exitUnlessActiveMacOsConsoleUser } from "./guardMacOsConsoleUser";
import { reviveAgentWitchWebSocket } from "./reviveAgentWitchWebSocket";

exitUnlessActiveMacOsConsoleUser("agent-witch-watchdog");

const formatReviveSummary = (
  result: Awaited<ReturnType<typeof reviveAgentWitchWebSocket>>,
): string => {
  if (result.reinstallAttempted === true) {
    if (result.reinstallOk === true) {
      return "reinstalled from install script and retried kickstart";
    }

    return (
      result.reinstallErrorMessage ?? "reinstall from install script failed"
    );
  }

  const targets = result.targets;
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
      `[agent-witch-watchdog] ${formatReviveSummary(result)}\n`,
    );
    return;
  }

  process.stderr.write(
    `[agent-witch-watchdog] revive failed: ${formatReviveSummary(result)}\n`,
  );
  process.exit(1);
};

void main();
