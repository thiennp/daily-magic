import AwcBotName from "@/features/projects/bots/AwcBotName";

interface AwcProjectAccessComputerAgentsProps {
  readonly computerName: string;
  readonly agents: readonly {
    readonly writerAgent: string;
    readonly label: string;
    readonly isOnline: boolean;
    readonly needsSignIn?: boolean;
  }[];
}

/** Each coding tool on a computer is a named agent, offline with its computer. */
export default function AwcProjectAccessComputerAgents({
  computerName,
  agents,
}: AwcProjectAccessComputerAgentsProps) {
  if (agents.length === 0) {
    return null;
  }
  return (
    <ul className="grid w-full gap-1.5 pl-4">
      {agents.map((agent) => (
        <li
          key={agent.writerAgent}
          data-agent-online={agent.isOnline}
          className={`flex items-center gap-2 text-sm ${agent.isOnline ? "" : "opacity-60"}`}
        >
          <span className="min-w-0 flex-1">
            <AwcBotName
              name={agent.label}
              kindHint={agent.writerAgent}
              className="font-medium text-awc-fg dark:text-white/90"
            />
            <span className="ml-2 text-xs text-awc-fg-muted">
              {computerName}
            </span>
          </span>
          <span className="text-xs text-awc-fg-muted">
            {agent.isOnline ? "Online" : "Offline"}
            {agent.needsSignIn ? " · Sign in needed" : ""}
          </span>
        </li>
      ))}
    </ul>
  );
}
