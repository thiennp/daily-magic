/** First connect step on the public bot-invite page — plain words for humans. */
export default function ProjectInviteConnectSteps() {
  return (
    <li>
      If your bot is not connected to Agent Witch yet, connect it first (the Copy
      prompt from Project Access covers this). Do not stop at &quot;no
      connector&quot; — ask your bot to follow the invite prompt, or open the
      Agent Witch guide for bots at{" "}
      <code className="break-all rounded bg-gray-100 px-1 dark:bg-white/10">
        https://www.agentwitch.com/for-agents
      </code>
      .
    </li>
  );
}
