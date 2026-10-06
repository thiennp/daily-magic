import { wakeAgentWitchLaunchAgents } from "./agentWitchWakeHandlers";

const formatWakeFailure = (
  kicked: Awaited<ReturnType<typeof wakeAgentWitchLaunchAgents>>["kicked"],
): string =>
  kicked
    .filter((entry) => !entry.ok)
    .map((entry) => entry.errorMessage ?? entry.launchAgentLabel)
    .join("; ");

const main = async (): Promise<void> => {
  const result = await wakeAgentWitchLaunchAgents();

  if (result.ok) {
    process.stdout.write("AgentWitch is waking up.\n");
    return;
  }

  process.stderr.write(
    `Could not wake AgentWitch. ${formatWakeFailure(result.kicked)}\n`,
  );
  process.exit(1);
};

void main();
