"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { resolveSendTaskCloseAction } from "@/features/agent/utils/resolveSendTaskPresentation";
import { resolveSendTaskModalPanelKey } from "@/features/agent/utils/resolveSendTaskModalPanelKey";
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
  }) => void;
  readonly closeSendTaskModal: () => void;
  readonly expandSendTaskModal: () => void;
  readonly minimizeSendTaskModal: () => void;
} => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isSessionActive, setKeepAlive, setPanelKey } = input;

  const minimizeSendTaskModal = useCallback(() => {
    setKeepAlive(true);
    router.replace(`${pathname}${stripSendTaskModalQuery(searchParams)}`, {
      scroll: false,
    });
  }, [pathname, router, searchParams, setKeepAlive]);

  const closeSendTaskModal = useCallback(() => {
    if (resolveSendTaskCloseAction({ isSessionActive }) === "minimize") {
      minimizeSendTaskModal();
      return;
    }

    setKeepAlive(false);
    router.replace(`${pathname}${stripSendTaskModalQuery(searchParams)}`, {
      scroll: false,
    });
  }, [
    isSessionActive,
    minimizeSendTaskModal,
    pathname,
    router,
    searchParams,
    setKeepAlive,
  ]);

  const openSendTaskModal = useCallback(
    (options?: {
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
      router.push(buildAgentComposerHref({ ...options, pathname }), {
        scroll: false,
      });
    },
    [pathname, router, setKeepAlive, setPanelKey],
  );

  const expandSendTaskModal = useCallback(() => {
    setKeepAlive(true);
    router.push(buildAgentComposerHref({ pathname, resumeLiveSession: true }), {
      scroll: false,
    });
  }, [pathname, router, setKeepAlive]);

  return {
    openSendTaskModal,
    closeSendTaskModal,
    expandSendTaskModal,
    minimizeSendTaskModal,
  };
};
