import { headers } from "next/headers";

import CopyableBashCommand from "@/features/home/CopyableBashCommand";
import AgentWitchUnsupportedHostNotice from "@/features/home/AgentWitchUnsupportedHostNotice";
import { buildLocalAgentInstallCommandFromHeaders } from "@/lib/agentWitch/buildLocalAgentInstallCommand";
import { getAuthActor } from "@/lib/auth/auth";
import isAgentWitchWebSocketSupportedHost from "@/lib/agentWitch/isAgentWitchWebSocketSupportedHost";

export default async function LocalAgentSetupInstructions() {
  const actor = await getAuthActor();
  const requestHeaders = await headers();
  const { installCommand, installScriptUrl, wsUrl } =
    buildLocalAgentInstallCommandFromHeaders(requestHeaders, {
      profileEmail: actor?.email ?? null,
    });
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "";
  const isWebSocketSupported = isAgentWitchWebSocketSupportedHost(host);

  return (
    <section className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-left dark:border-gray-700 dark:bg-gray-900/50">
      <h2 className="text-sm font-semibold text-gray-800 dark:text-white/90">
        Connect your Mac
      </h2>
      {!isWebSocketSupported ? (
        <div className="mt-4">
          <AgentWitchUnsupportedHostNotice host={host} />
        </div>
      ) : null}
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Run this install command on your Mac. It sets up Agent Witch so this
        website can send tasks to your computer. On macOS it also starts
        automatically when you sign in.
        {!isWebSocketSupported
          ? " This website host cannot keep a live connection open — use a supported deployment before connecting."
          : null}
      </p>
      {isWebSocketSupported ? (
        <CopyableBashCommand command={installCommand} />
      ) : null}
      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        After install, copy the pairing code from the terminal into{" "}
        <strong>Connect this browser</strong> above. Then you can send tasks
        from{" "}
        <a
          href="/agent"
          className="text-brand-600 hover:underline dark:text-brand-400"
        >
          Send a task
        </a>
        .
      </p>
      <details className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        <summary className="cursor-pointer font-medium text-gray-600 dark:text-gray-300">
          Advanced details
        </summary>
        <p className="mt-2">
          Install folder:{" "}
          <code className="rounded bg-white px-1 py-0.5 dark:bg-gray-800">
            ~/.agent-witch
          </code>
          . Script:{" "}
          <a
            href={installScriptUrl}
            className="text-brand-600 hover:underline dark:text-brand-400"
          >
            {installScriptUrl}
          </a>
          . Connects to{" "}
          <code className="rounded bg-white px-1 py-0.5 dark:bg-gray-800">
            {wsUrl}
          </code>
          . Wake helper (macOS):{" "}
          <code className="rounded bg-white px-1 py-0.5 dark:bg-gray-800">
            http://127.0.0.1:47892/wake
          </code>
          .
        </p>
      </details>
    </section>
  );
}
