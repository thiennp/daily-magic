import { exitUnlessActiveMacOsConsoleUser } from "./guardMacOsConsoleUser";
import { runAgentWitchReportCli } from "./agentWitchReportCli";
import { isAgentWitchBundled } from "./agentWitchBundled.constant";
import { isAgentWitchScriptEntryPoint } from "./isAgentWitchScriptEntryPoint";
import { assertAgentWitchNodeRuntimeVersion } from "./assertAgentWitchNodeRuntimeVersion";
import {
  CHECK_CONTEXT_HOOK_NAME,
  CHECK_CONTEXT_HOOK_SUBCOMMAND,
} from "@agent-witch/live-token-saver/types";

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
    process.stdout.write("AgentWitch is waking up.\n");
    return;
  }

  const failure = result.kicked
    .filter((entry) => !entry.ok)
    .map((entry) => entry.errorMessage ?? entry.launchAgentLabel)
    .join("; ");

  process.stderr.write(`Could not wake AgentWitch. ${failure}\n`);
  process.exit(1);
};

/**
 * `agent-witch mcp-hook check_context` (Claude UserPromptSubmit). Always exits
 * 0 so it never blocks the prompt; failures go to stderr only.
 */
const runMcpHookCli = async (hookName: string | undefined): Promise<never> => {
  try {
    if (hookName === CHECK_CONTEXT_HOOK_NAME) {
      const { resolveAgentWitchLocalLayout } =
        await import("@agent-witch/install-layout");
      const { runCheckContextHookCli } =
        await import("@agent-witch/live-token-saver");
      await runCheckContextHookCli({ layout: resolveAgentWitchLocalLayout() });
    } else if (hookName === "knowledge_capture") {
      const { resolveAgentWitchLocalLayout } =
        await import("@agent-witch/install-layout");
      const { runKnowledgeCaptureHookCli } =
        await import("@agent-witch/live-token-saver");
      await runKnowledgeCaptureHookCli({
        layout: resolveAgentWitchLocalLayout(),
      });
    } else {
      process.stderr.write(
        `[agent-witch] ${CHECK_CONTEXT_HOOK_SUBCOMMAND}: unknown hook ${hookName ?? "(none)"}\n`,
      );
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    process.stderr.write(
      `[agent-witch] ${CHECK_CONTEXT_HOOK_SUBCOMMAND}: ${message}\n`,
    );
  }
  // Flush stdout (async pipe on macOS) before exiting 0.
  await new Promise<void>((resolve) => {
    process.stdout.write("", () => resolve());
  });
  process.exit(0);
};

const run = async (): Promise<void> => {
  if (
    !isAgentWitchScriptEntryPoint(
      isAgentWitchBundled() ? undefined : import.meta.url,
    )
  ) {
    return;
  }

  // Before the runtime assert: a too-old Node must not exit 1 inside a hook.
  if (process.argv[2] === CHECK_CONTEXT_HOOK_SUBCOMMAND) {
    await runMcpHookCli(process.argv[3]);
  }

  assertAgentWitchNodeRuntimeVersion();

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

  if (subcommand === "bridge") {
    const { runAgentWitchBridgeCli } =
      await import("../apps/install/entry/runAgentWitchBridgeCli");
    await runAgentWitchBridgeCli();
    return;
  }

  if (subcommand === "local-app") {
    const { runAgentWitchExternalLiveCli } =
      await import("../apps/install/entry/runAgentWitchExternalLiveCli");
    runAgentWitchExternalLiveCli();
    return;
  }

  if (subcommand === "agent" && process.argv[3] === "run") {
    const { runAgentWitchAgentRunCli } =
      await import("../apps/install/entry/runAgentWitchAgentRunCli");
    await runAgentWitchAgentRunCli(process.argv.slice(4));
    return;
  }

  if (subcommand === "task-intake") {
    const { resolveAgentWitchLocalLayout } =
      await import("@agent-witch/install-layout");
    const { runTaskIntakeCli } = await import("@agent-witch/live-token-saver");
    const { readCrossAccountFolderClaims, resolveAgentWitchProjectIdFromCwd } =
      await import("@agent-witch/live-projects");
    const layout = resolveAgentWitchLocalLayout();
    process.exit(
      await runTaskIntakeCli(process.argv.slice(3), {
        layout,
        resolveProjectId: resolveAgentWitchProjectIdFromCwd,
        readClaims: () => readCrossAccountFolderClaims(layout.installDir),
        writeStdout: (text) => {
          process.stdout.write(text);
        },
        writeStderr: (text) => {
          process.stderr.write(text);
        },
        defaultCwd: process.cwd(),
      }),
    );
  }

  if (subcommand === "mcp") {
    const { resolveAgentWitchLocalLayout } =
      await import("@agent-witch/install-layout");
    const { runAwlMcpStdio } = await import("@agent-witch/live-mcp");
    await runAwlMcpStdio({ layout: resolveAgentWitchLocalLayout() });
    return;
  }

  const { startAgentWitchClient } = await import("./agent-witch");
  await startAgentWitchClient();
};

void run();
