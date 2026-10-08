interface AwcProjectAccessComputerAgentsProps {
  readonly agents: readonly {
    readonly writerAgent: string;
    readonly label: string;
    readonly isOnline: boolean;
    readonly needsSignIn?: boolean;
  }[];
}

/** Each coding tool on a computer is its own agent; offline with the computer. */
export default function AwcProjectAccessComputerAgents({
  agents,
}: AwcProjectAccessComputerAgentsProps) {
  if (agents.length === 0) {
    return null;
  }
  return (
    <ul className="flex w-full flex-wrap gap-2 pl-4 text-xs">
      {agents.map((agent) => (
        <li
          key={agent.writerAgent}
          data-agent-online={agent.isOnline}
          className={`rounded-full border px-2 py-0.5 ${
            agent.isOnline
              ? "border-gray-900 text-awc-fg dark:border-white dark:text-white"
              : "border-awc-border-strong text-awc-fg-muted dark:border-gray-700 dark:text-gray-400"
          }`}
        >
          {agent.label} · {agent.isOnline ? "Online" : "Offline"}
          {agent.needsSignIn ? " · Sign in needed" : ""}
        </li>
      ))}
    </ul>
  );
}
