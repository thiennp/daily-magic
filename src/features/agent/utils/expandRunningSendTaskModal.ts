import { resolveSendTaskModalPanelKey } from "@/features/agent/utils/resolveSendTaskModalPanelKey";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";

export const expandRunningSendTaskModal = (input: {
  readonly runId: string;
  readonly pathname: string;
  readonly router: {
    readonly push: (
      href: string,
      options?: { readonly scroll?: boolean },
    ) => void;
  };
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
  input.router.push(
    buildAgentComposerHref({
      pathname: input.pathname,
      sourceRunId: runId,
      resumeLiveSession: true,
    }),
    { scroll: false },
  );
};
