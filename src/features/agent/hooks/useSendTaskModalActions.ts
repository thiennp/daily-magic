"use client";

import { useCallback } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { buildSignInHref } from "@/features/empty-states/public-api/types";
import { resolveSendTaskModalPanelKey } from "@/features/agent/utils/resolveSendTaskModalPanelKey";
import { clearPersistedAgentLiveTerminalState } from "@/features/agent/utils/agentLiveTerminalLocalStore";
import { clearLiveFloaterRunId } from "@/features/agent/utils/liveFloaterRunIdStorage";
import { announceSendTaskClose } from "@/features/agent/utils/sendTaskSessionEvents";
import { expandRunningSendTaskModal } from "@/features/agent/utils/expandRunningSendTaskModal";
import { setSendTaskModalUrl } from "@/features/agent/utils/setSendTaskModalUrl";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";
import { stripSendTaskModalQuery } from "@/features/agent/utils/stripSendTaskModalQuery";

export const useSendTaskModalActions = (input: {
  readonly isSessionActive: boolean;
  readonly setKeepAlive: (value: boolean) => void;
  readonly setPanelKey: (value: string) => void;
}): {
  readonly openSendTaskModal: (options?: {
    readonly libraryCapabilityId?: string;
    readonly prompt?: string;
    readonly deviceId?: string;
    readonly projectId?: string;
    readonly writerAgent?: string;
    readonly customTask?: boolean;
  }) => void;
  readonly expandRunningSendTask: (runId: string) => void;
  readonly closeSendTaskModal: () => void;
  readonly expandSendTaskModal: () => void;
  readonly minimizeSendTaskModal: () => void;
} => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const { setKeepAlive, setPanelKey } = input;

  const minimizeSendTaskModal = useCallback(() => {
    setKeepAlive(true);
    setSendTaskModalUrl(
      `${pathname}${stripSendTaskModalQuery(searchParams)}`,
      "replace",
    );
  }, [pathname, searchParams, setKeepAlive]);

  // S11: Close always hides the panel/floater; it never stops the run.
  // ed42d8ce: it does end a session with nothing running, and it forgets the
  // focused session and floater run so a reload does not bring them back.
  const closeSendTaskModal = useCallback(() => {
    announceSendTaskClose();
    setSendTaskModalUrl(
      `${pathname}${stripSendTaskModalQuery(searchParams)}`,
      "replace",
    );
    window.setTimeout(() => {
      clearPersistedAgentLiveTerminalState();
      clearLiveFloaterRunId();
      setKeepAlive(false);
    }, 0);
  }, [pathname, searchParams, setKeepAlive]);

  const openSendTaskModal = useCallback(
    (options?: {
      readonly libraryCapabilityId?: string;
      readonly prompt?: string;
      readonly deviceId?: string;
      readonly projectId?: string;
      readonly writerAgent?: string;
      readonly customTask?: boolean;
    }) => {
      const composerHref = buildAgentComposerHref({ ...options, pathname });

      if (!session?.user && options?.libraryCapabilityId) {
        router.push(buildSignInHref(composerHref), { scroll: false });
        return;
      }

      setKeepAlive(true);
      clearPersistedAgentLiveTerminalState();
      setPanelKey(
        resolveSendTaskModalPanelKey({
          shouldRestoreLiveSession: false,
          capabilityFromUrl: "custom",
        }),
      );
      setSendTaskModalUrl(composerHref, "push");
    },
    [pathname, router, session?.user, setKeepAlive, setPanelKey],
  );

  const expandRunningSendTask = useCallback(
    (runId: string) => {
      expandRunningSendTaskModal({
        runId,
        pathname,
        setKeepAlive,
        setPanelKey,
      });
    },
    [pathname, setKeepAlive, setPanelKey],
  );

  const expandSendTaskModal = useCallback(() => {
    setKeepAlive(true);
    setSendTaskModalUrl(
      buildAgentComposerHref({ pathname, resumeLiveSession: true }),
      "push",
    );
  }, [pathname, setKeepAlive]);

  return {
    openSendTaskModal,
    expandRunningSendTask,
    closeSendTaskModal,
    expandSendTaskModal,
    minimizeSendTaskModal,
  };
};
