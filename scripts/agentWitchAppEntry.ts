import { exitUnlessActiveMacOsConsoleUser } from "./guardMacOsConsoleUser";
import { runAgentWitchReportCli } from "./agentWitchReportCli";
import { isAgentWitchScriptEntryPoint } from "./isAgentWitchScriptEntryPoint";

const runSelfUpdateCli = async (): Promise<void> => {
  exitUnlessActiveMacOsConsoleUser("agent-witch-self-update");
  const { runAgentWitchSelfUpdate } = await import("./agentWitchSelfUpdate");
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

const runWakeCli = async (): Promise<void> => {
  const { wakeAgentWitchLaunchAgents } =
    await import("./agentWitchWakeHandlers");

  const result = await wakeAgentWitchLaunchAgents();
  if (result.ok) {
    process.stdout.write("Agent Witch is waking up.\n");
    return;
  }

  const failure = result.kicked
    .filter((entry) => !entry.ok)
    .map((entry) => entry.errorMessage ?? entry.launchAgentLabel)
    .join("; ");

  process.stderr.write(`Could not wake Agent Witch. ${failure}\n`);
  process.exit(1);
};

const run = async (): Promise<void> => {
  if (!isAgentWitchScriptEntryPoint(import.meta.url)) {
    return;
  }

  const reportArgvIndex = process.argv.indexOf("report");
  if (reportArgvIndex >= 0) {
    process.exit(runAgentWitchReportCli(process.argv.slice(reportArgvIndex)));
  }

  const subcommand = process.argv[2];
  if (subcommand === "self-update") {
    await runSelfUpdateCli();
    return;
  }

  if (subcommand === "wake") {
    await runWakeCli();
    return;
  }

  const { startAgentWitchClient } = await import("./agent-witch");
  await startAgentWitchClient();
};

void run();
