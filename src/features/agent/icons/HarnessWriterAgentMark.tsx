import AntigravityWriterAgentMark from "@/features/agent/icons/AntigravityWriterAgentMark";
import ClaudeWriterAgentMark from "@/features/agent/icons/ClaudeWriterAgentMark";
import CodexWriterAgentMark from "@/features/agent/icons/CodexWriterAgentMark";
import CursorWriterAgentMark from "@/features/agent/icons/CursorWriterAgentMark";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

const WRITER_AGENT_MARK_CLASS: Record<HarnessWriterAgent, string> = {
  "claude-cli": "h-5 w-5 text-[#D97757]",
  codex: "h-5 w-5 text-gray-900 dark:text-white",
  cursor: "h-5 w-5 text-gray-900 dark:text-white",
  antigravity: "h-5 w-5 text-sky-600 dark:text-sky-400",
};

interface HarnessWriterAgentMarkProps {
  readonly writerAgent: HarnessWriterAgent;
}

export default function HarnessWriterAgentMark({
  writerAgent,
}: HarnessWriterAgentMarkProps) {
  const className = WRITER_AGENT_MARK_CLASS[writerAgent];

  switch (writerAgent) {
    case "claude-cli":
      return <ClaudeWriterAgentMark className={className} />;
    case "codex":
      return <CodexWriterAgentMark className={className} />;
    case "cursor":
      return <CursorWriterAgentMark className={className} />;
    case "antigravity":
      return <AntigravityWriterAgentMark className={className} />;
  }
}
