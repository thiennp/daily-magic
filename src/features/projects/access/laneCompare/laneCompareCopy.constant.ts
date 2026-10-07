/**
 * Two ways to use local AI tools — COPY-S0-A-B-C.md §2a (Thien HARD).
 * Visible UI must never say Lane A/B, API, MCP, OAuth, token, CLI, or "bot".
 */
export const LANE_COMPARE_COPY = {
  title: "Two ways to use local AI tools",
  codingTools: {
    label: "Coding tools on this computer",
    when: "AgentWitch Local starts the tool for a task on this computer. You may need to approve the run.",
    where: "Team → Computers → Add to project",
  },
  assistant: {
    label: "Connect as an assistant",
    when: "Cursor Desktop or Claude Desktop joins the project like other assistants. You Approve the join; they check on demand.",
    where: "Invite / Connect assistant",
  },
  diff: {
    results:
      "Tasks on a coding tool run on this computer with computer limits. An assistant works in its own seat and checks when you ask.",
    approvals:
      "Computer runs follow Allow runs without approval or approval cards. An assistant join needs owner Approve first.",
  },
  help: {
    computers:
      "Prefer coding tools when AgentWitch Local should run the task on this computer. Prefer Connect as an assistant when a Desktop app should join like other assistants.",
    invite:
      "Cursor Desktop and Claude Desktop join as assistants here — not as coding tools on a computer.",
  },
  openLabel: "Two ways to use local AI tools",
  closeLabel: "Close",
} as const;
