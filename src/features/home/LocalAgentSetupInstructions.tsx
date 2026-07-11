import { headers } from "next/headers";

import CopyableBashCommand from "@/features/home/CopyableBashCommand";
import { buildLocalAgentInstallCommandFromHeaders } from "@/lib/agentWitch/buildLocalAgentInstallCommand";

export default async function LocalAgentSetupInstructions() {
  const requestHeaders = await headers();
  const { installCommand, installScriptUrl, wsUrl } =
    buildLocalAgentInstallCommandFromHeaders(requestHeaders);

  return (
    <section className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-5 text-left dark:border-gray-700 dark:bg-gray-900/50">
      <h2 className="text-sm font-semibold text-gray-800 dark:text-white/90">
        Connect local Agent Witch
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Run this on your computer to install the local client to{" "}
        <code className="rounded bg-white px-1.5 py-0.5 text-xs dark:bg-gray-800">
          ~/.agent-witch
        </code>
        . The install script is served by this app and starts immediately on
        macOS (LaunchAgent), with auto-reconnect and crash recovery.
      </p>
      <CopyableBashCommand command={installCommand} />
      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        Script URL:{" "}
        <a
          href={installScriptUrl}
          className="text-brand-600 hover:underline dark:text-brand-400"
        >
          {installScriptUrl}
        </a>
        . The client connects to{" "}
        <code className="rounded bg-white px-1.5 py-0.5 dark:bg-gray-800">
          {wsUrl}
        </code>{" "}
        and retries until the app is up. Send tasks from{" "}
        <a
          href="/ws-test"
          className="text-brand-600 hover:underline dark:text-brand-400"
        >
          WebSocket test
        </a>
        .
      </p>
    </section>
  );
}
