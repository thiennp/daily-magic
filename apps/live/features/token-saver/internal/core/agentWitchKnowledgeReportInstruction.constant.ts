import {
  AGENT_WITCH_BRIDGE_PORT_LOCALHOST_INSTALL,
  AGENT_WITCH_BRIDGE_PORT_PRODUCTION_INSTALL,
} from "@agent-witch/shared/deployables";

import { resolveAgentWitchKnowledgeReportWakePort } from "./resolveAgentWitchKnowledgeReportWakePort";

const bridgeKnowledgeUpdateUrl = (port: number): string =>
  `http://127.0.0.1:${port}/knowledge/update`;

const WAKE_PORT_FILE_HINT =
  "wake-port.json under ~/.agent-witch (install root or profiles/<email>/)";

export type BuildKnowledgeReportInstructionInput = {
  readonly wakePort?: number;
  readonly resolveWakePort?: () => number;
};

const resolveWakePortForInstructions = (
  input?: BuildKnowledgeReportInstructionInput,
): number =>
  input?.wakePort ??
  input?.resolveWakePort?.() ??
  resolveAgentWitchKnowledgeReportWakePort();

/** Shared copy for any local agent (Cursor, Codex, Claude, other CLIs). */
export const buildKnowledgeReportGlobalInstructionLines = (
  input?: BuildKnowledgeReportInstructionInput,
): readonly string[] => {
  const wakePort = resolveWakePortForInstructions(input);
  const primaryUrl = bridgeKnowledgeUpdateUrl(wakePort);
  const fallbacks = [
    AGENT_WITCH_BRIDGE_PORT_PRODUCTION_INSTALL,
    AGENT_WITCH_BRIDGE_PORT_LOCALHOST_INSTALL,
  ].filter((port) => port !== wakePort);

  const lines: string[] = [
    "AgentWitch knowledge report (any local agent on this Mac):",
    "When you know a projectId (setup_project, project rule, or check_context) and learned a reusable lesson,",
    "POST to the Mac bridge — not www.agentwitch.com and not browser OAuth.",
    `Use: ${primaryUrl}`,
    `Port ${wakePort} was read from ${WAKE_PORT_FILE_HINT} when this instruction was written.`,
    `If connection refused, re-read wakePort from ${WAKE_PORT_FILE_HINT} and POST http://127.0.0.1:<wakePort>/knowledge/update.`,
  ];

  if (fallbacks.length > 0) {
    lines.push(
      `Also try: ${fallbacks.map((port) => bridgeKnowledgeUpdateUrl(port)).join(" or ")} (default install ports).`,
    );
  }

  lines.push(
    'Body JSON: {"projectId":"<id>","lesson":"<plain text>","sourceRunId":"<optional>"}.',
    "No secrets, tokens, or private code in lesson.",
    "On 409 (not paired) or 404 (no access), tell the user once; do not retry in a loop.",
    "After an AWB port change, restart AgentWitch on this Mac or re-run setup_project so these instructions refresh.",
  );

  return lines;
};

/** Project-scoped variant (repo or global rule with fixed projectId). */
export const buildKnowledgeReportProjectInstructionLines = (
  projectId: string,
  input?: BuildKnowledgeReportInstructionInput,
): readonly string[] => [
  ...buildKnowledgeReportGlobalInstructionLines(input),
  `This project: projectId "${projectId}".`,
  `Example body: {"projectId":"${projectId}","lesson":"<plain text>"}.`,
];
