import type { ProjectBriefing } from "@/lib/projects/acl/types/ProjectBriefing.type";

const formatPeer = (peer: {
  readonly projectDisplayName: string | null;
  readonly teamLabel: string | null;
}): string => {
  const name = peer.projectDisplayName ?? "(unnamed)";
  return peer.teamLabel ? `${name} [${peer.teamLabel}]` : name;
};

/** Compact one-shot briefing string for agents (Copy prompt / poll path). */
export const formatProjectBriefingText = (
  briefing: Omit<ProjectBriefing, "briefingText">,
): string => {
  const callerName = briefing.caller.projectDisplayName ?? "(unnamed)";
  const peerLine =
    briefing.peers.length === 0
      ? "Peers: none yet."
      : `Peers: ${briefing.peers.map(formatPeer).join(", ")}.`;
  const playbookLine =
    briefing.playbooks.boundHarnessSetSlugs.length === 0
      ? "Harness sets: none bound (reusable know-how lives in the project library: look it up by task before you start)."
      : `Harness sets: ${briefing.playbooks.boundHarnessSetSlugs.join(", ")}.`;
  return [
    `Project ${briefing.projectName} (${briefing.projectId}). You: ${callerName}.`,
    peerLine,
    briefing.howToDispatch,
    playbookLine,
    ...(briefing.definitionOfDone === null
      ? []
      : [`Definition of done: ${briefing.definitionOfDone}`]),
  ].join(" ");
};
