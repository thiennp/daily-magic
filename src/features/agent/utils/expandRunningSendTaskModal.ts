import { resolveSendTaskModalPanelKey } from "@/features/agent/utils/resolveSendTaskModalPanelKey";
import { setSendTaskModalUrl } from "@/features/agent/utils/setSendTaskModalUrl";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";

export const expandRunningSendTaskModal = (input: {
  readonly runId: string;
  readonly pathname: string;
  readonly setKeepAlive: (value: boolean) => void;
  readonly setPanelKey: (value: string) => void;
}): void => {
  const runId = input.runId.trim();
  if (runId.length === 0) {
    return;
  }

  input.setKeepAlive(true);
  input.setPanelKey(
    resolveSendTaskModalPanelKey({
      shouldRestoreLiveSession: true,
      sourceRunId: runId,
      capabilityFromUrl: "custom",
    }),
  );
  setSendTaskModalUrl(
    buildAgentComposerHref({
      pathname: input.pathname,
      sourceRunId: runId,
      resumeLiveSession: true,
    }),
    "push",
  );
};
