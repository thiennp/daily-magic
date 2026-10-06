import {
  AWL_REPAIR_THIS_COMPUTER_POINTER_COPY as REPAIR,
  AWL_REPAIR_THIS_COMPUTER_URL,
} from "@/lib/agentAccess/awlRepairThisComputerPointerCopy.constant";

/** First connect step on the public assistant-invite page — plain words for humans. */
export default function ProjectInviteConnectSteps() {
  return (
    <li>
      If your assistant is not connected to Agent Witch yet, connect it first
      (the Copy prompt from Project Access covers this). Do not stop at
      &quot;no connector&quot; — ask your assistant to follow the invite prompt,
      or open the Agent Witch guide for assistants at{" "}
      <code className="break-all rounded bg-gray-100 px-1 dark:bg-white/10">
        https://www.agentwitch.com/for-agents
      </code>
      . {REPAIR.invitePagePrefix}{" "}
      <a href={AWL_REPAIR_THIS_COMPUTER_URL} className="font-medium underline">
        {REPAIR.invitePageLinkLabel}
      </a>
      .
    </li>
  );
}
