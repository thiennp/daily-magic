import { runAgentWitchSelfUpdate } from "./agentWitchSelfUpdate";

const main = async (): Promise<void> => {
  const result = await runAgentWitchSelfUpdate();

  if (result.updated) {
    process.stdout.write(`[agent-witch-self-update] ${result.message}\n`);
    return;
  }

  if (result.ok) {
    process.stdout.write(
      `[agent-witch-self-update] ${result.message} (bundle ${result.remoteBundleVersion ?? "unknown"})\n`,
    );
    return;
  }

  process.stderr.write(`[agent-witch-self-update] ${result.message}\n`);
  process.exit(1);
};

void main();
