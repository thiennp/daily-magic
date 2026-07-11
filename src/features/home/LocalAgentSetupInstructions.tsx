export default function LocalAgentSetupInstructions() {
  return (
    <section className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-5 text-left dark:border-gray-700 dark:bg-gray-900/50">
      <h2 className="text-sm font-semibold text-gray-800 dark:text-white/90">
        Connect local Agent Witch
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Run this from the project root to install the local client to{" "}
        <code className="rounded bg-white px-1.5 py-0.5 text-xs dark:bg-gray-800">
          ~/.agent-witch
        </code>{" "}
        and start it with your computer (macOS LaunchAgent).
      </p>
      <pre className="mt-4 overflow-x-auto rounded-lg border border-gray-200 bg-white p-4 text-left text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200">
        <code>bash scripts/install-agent-witch.sh</code>
      </pre>
      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        Or:{" "}
        <code className="rounded bg-white px-1.5 py-0.5 dark:bg-gray-800">
          npm run agent-witch:install
        </code>
        . Start the app with{" "}
        <code className="rounded bg-white px-1.5 py-0.5 dark:bg-gray-800">
          npm run dev
        </code>{" "}
        before sending tasks from{" "}
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
