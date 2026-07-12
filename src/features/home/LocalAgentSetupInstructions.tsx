import { headers } from "next/headers";

import CopyableBashCommand from "@/features/home/CopyableBashCommand";
import AgentWitchUnsupportedHostNotice from "@/features/home/AgentWitchUnsupportedHostNotice";
import { buildLocalAgentInstallCommandFromHeaders } from "@/lib/agentWitch/buildLocalAgentInstallCommand";
import { getAuthActor } from "@/lib/auth/auth";
import isAgentWitchWebSocketSupportedHost from "@/lib/agentWitch/isAgentWitchWebSocketSupportedHost";

export default async function LocalAgentSetupInstructions() {
  const actor = await getAuthActor();
  const requestHeaders = await headers();
  const { installCommand, installScriptUrl, wsUrl, harnessDirectory } =
    buildLocalAgentInstallCommandFromHeaders(requestHeaders, {
      profileEmail: actor?.email ?? null,
    });
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "";
  const isWebSocketSupported = isAgentWitchWebSocketSupportedHost(host);

  return (
    <section className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-left dark:border-gray-700 dark:bg-gray-900/50">
      <h2 className="text-sm font-semibold text-gray-800 dark:text-white/90">
        Connect local Agent Witch
      </h2>
      {!isWebSocketSupported ? (
        <div className="mt-4">
          <AgentWitchUnsupportedHostNotice host={host} />
        </div>
      ) : null}
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Run this on your computer to install the local client to{" "}
        <code className="rounded bg-white px-1.5 py-0.5 text-xs dark:bg-gray-800">
          ~/.agent-witch
        </code>
        {harnessDirectory !== null ? (
          <>
            {" "}
            with an account-scoped harness at{" "}
            <code className="rounded bg-white px-1.5 py-0.5 text-xs dark:bg-gray-800">
              {harnessDirectory}
            </code>
          </>
        ) : null}
        . The install script is served by this app and starts immediately on
        macOS (LaunchAgent), with auto-reconnect and crash recovery.
        {!isWebSocketSupported
          ? " This host cannot keep a WebSocket open, so use a supported deployment before connecting."
          : null}
      </p>
      {isWebSocketSupported ? (
        <CopyableBashCommand command={installCommand} />
      ) : null}
      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        After install, copy the pairing token printed by the script into{" "}
        <strong>Local agent pairing</strong> on this page. The dashboard only
        routes harness and Claude commands to your paired local agent.
      </p>
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
          href="/agent"
          className="text-brand-600 hover:underline dark:text-brand-400"
        >
          Send a test task
        </a>
        . Add another account on the same computer by signing in as that user
        and running the install command again (each profile gets its own
        LaunchAgent, config, and harness folder).
      </p>
    </section>
  );
}
