import {
  canRequestLocalAgentWitchApi,
  resolveAgentWitchWakeBaseUrlForPage,
} from "@/lib/agentWitch/linkLocalAgentAccount";
import type HarnessInstallBundle from "@/lib/agentWitch/harness/types/HarnessInstallBundle.type";

export const requestLocalHarnessInstall = async (input: {
  readonly bundle: HarnessInstallBundle;
  readonly appOrigin: string;
  readonly profileEmail?: string;
}): Promise<{
  readonly ok: boolean;
  readonly writtenItemCount?: number;
  readonly errorMessage?: string;
}> => {
  if (!canRequestLocalAgentWitchApi()) {
    return { ok: false, errorMessage: "Browser environment required." };
  }

  try {
    const response = await fetch(
      `${resolveAgentWitchWakeBaseUrlForPage()}/harness/install`,
      {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appOrigin: input.appOrigin,
          profileEmail: input.profileEmail,
          bundle: input.bundle,
        }),
        signal: AbortSignal.timeout(30_000),
      },
    );

    const data: unknown = await response.json();
    if (
      response.ok &&
      typeof data === "object" &&
      data !== null &&
      "ok" in data &&
      (data as { ok: boolean }).ok === true
    ) {
      const record = data as { writtenItemCount?: unknown };
      const writtenItemCount =
        typeof record.writtenItemCount === "number"
          ? record.writtenItemCount
          : undefined;
      return { ok: true, writtenItemCount };
    }

    const errorMessage =
      typeof data === "object" &&
      data !== null &&
      "errorMessage" in data &&
      typeof (data as { errorMessage: unknown }).errorMessage === "string"
        ? (data as { errorMessage: string }).errorMessage
        : "Could not install harness on this Mac.";

    return { ok: false, errorMessage };
  } catch (error) {
    if (error instanceof DOMException && error.name === "TimeoutError") {
      return {
        ok: false,
        errorMessage: "Harness install timed out on this Mac.",
      };
    }

    return {
      ok: false,
      errorMessage:
        "Agent Witch on this Mac is not running. Run install first.",
    };
  }
};
