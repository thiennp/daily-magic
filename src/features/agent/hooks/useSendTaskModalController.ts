"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useSendTaskModalUrlFlags } from "@/features/agent/hooks/useSendTaskModalUrlFlags";
import { resolveSendTaskPresentation } from "@/features/agent/utils/resolveSendTaskPresentation";
import { resolveSendTaskModalPanelKey } from "@/features/agent/utils/resolveSendTaskModalPanelKey";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";
import { stripSendTaskModalQuery } from "@/features/agent/utils/stripSendTaskModalQuery";

export const useSendTaskModalController = (): {
  readonly presentation: ReturnType<typeof resolveSendTaskPresentation>;
  readonly panelKey: string;
  readonly isOpen: boolean;
  readonly openSendTaskModal: (input?: {
    readonly libraryCapabilityId?: string;
    readonly prompt?: string;
    readonly deviceId?: string;
  }) => void;
  readonly closeSendTaskModal: () => void;
  readonly expandSendTaskModal: () => void;
  readonly minimizeSendTaskModal: () => void;
} => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { urlWantsOpen, shouldRestoreLiveSession, capabilityFromUrl } =
    useSendTaskModalUrlFlags();
  const [keepAlive, setKeepAlive] = useState(urlWantsOpen);
  const [panelKey, setPanelKey] = useState(() =>
    resolveSendTaskModalPanelKey({
      shouldRestoreLiveSession,
      capabilityFromUrl,
    }),
  );
  const [wasUrlOpen, setWasUrlOpen] = useState(urlWantsOpen);

  if (urlWantsOpen !== wasUrlOpen) {
    setWasUrlOpen(urlWantsOpen);
    if (urlWantsOpen) {
      setKeepAlive(true);
      setPanelKey(
        resolveSendTaskModalPanelKey({
          shouldRestoreLiveSession,
          capabilityFromUrl,
        }),
      );
    }
  }

  const presentation = resolveSendTaskPresentation({ urlWantsOpen, keepAlive });

  const closeSendTaskModal = useCallback(() => {
    setKeepAlive(false);
    router.replace(`${pathname}${stripSendTaskModalQuery(searchParams)}`, {
      scroll: false,
    });
  }, [pathname, router, searchParams]);

  const openSendTaskModal = useCallback(
    (input?: {
      readonly libraryCapabilityId?: string;
      readonly prompt?: string;
      readonly deviceId?: string;
    }) => {
      setKeepAlive(true);
      setPanelKey(
        resolveSendTaskModalPanelKey({
          shouldRestoreLiveSession: false,
          capabilityFromUrl: "custom",
        }),
      );
      router.push(buildAgentComposerHref({ ...input, pathname }), {
        scroll: false,
      });
    },
    [pathname, router],
  );

  const expandSendTaskModal = useCallback(() => {
    setKeepAlive(true);
    router.push(buildAgentComposerHref({ pathname, resumeLiveSession: true }), {
      scroll: false,
    });
  }, [pathname, router]);

  const minimizeSendTaskModal = useCallback(() => {
    setKeepAlive(true);
    router.replace(`${pathname}${stripSendTaskModalQuery(searchParams)}`, {
      scroll: false,
    });
  }, [pathname, router, searchParams]);

  return useMemo(
    () => ({
      presentation,
      panelKey,
      isOpen: presentation === "expanded",
      openSendTaskModal,
      closeSendTaskModal,
      expandSendTaskModal,
      minimizeSendTaskModal,
    }),
    [
      closeSendTaskModal,
      expandSendTaskModal,
      minimizeSendTaskModal,
      openSendTaskModal,
      panelKey,
      presentation,
    ],
  );
};
