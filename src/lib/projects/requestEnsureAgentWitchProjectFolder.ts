import {
  canRequestLocalAgentWitchApi,
  resolveAgentWitchWakeBaseUrlForPage,
} from "@/lib/agentWitch/agentWitchWakePageClient";
import { resolveAgentWitchWakeBaseUrlForPort } from "@/lib/agentWitch/resolveAgentWitchWakeBaseUrlForPort";

export const requestEnsureAgentWitchProjectFolder = async (input: {
  readonly projectFolderPath: string;
  readonly projectId?: string;
  readonly projectName?: string;
  readonly wakePort?: number | null;
}): Promise<{ readonly ok: boolean; readonly errorMessage?: string }> => {
  if (!canRequestLocalAgentWitchApi()) {
    return { ok: false, errorMessage: "Browser environment required." };
  }

  const wakeBaseUrl =
    input.wakePort !== undefined && input.wakePort !== null
      ? resolveAgentWitchWakeBaseUrlForPort(input.wakePort)
      : resolveAgentWitchWakeBaseUrlForPage();

  try {
    const response = await fetch(`${wakeBaseUrl}/projects/ensure`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectFolderPath: input.projectFolderPath,
        ...(input.projectId !== undefined
          ? { projectId: input.projectId }
          : {}),
        ...(input.projectName !== undefined
          ? { projectName: input.projectName }
          : {}),
      }),
      signal: AbortSignal.timeout(15_000),
    });

    const data: unknown = await response.json();

    if (
      response.ok &&
      typeof data === "object" &&
      data !== null &&
      "ok" in data &&
      (data as { ok: boolean }).ok === true
    ) {
      return { ok: true };
    }

    const errorMessage =
      typeof data === "object" &&
      data !== null &&
      "errorMessage" in data &&
      typeof (data as { errorMessage: unknown }).errorMessage === "string"
        ? (data as { errorMessage: string }).errorMessage
        : "Could not prepare the project folder on this Mac.";

    return { ok: false, errorMessage };
  } catch {
    return {
      ok: false,
      errorMessage:
        "Agent Witch on this Mac is not running. Run install first.",
    };
  }
};
