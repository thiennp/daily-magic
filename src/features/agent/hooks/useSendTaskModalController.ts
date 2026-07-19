"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  SEND_TASK_MODAL_QUERY_PARAM,
  SEND_TASK_MODAL_QUERY_VALUE,
} from "@/features/agent/constants/sendTaskModalQuery.constant";
import { resolveSendTaskPresentation } from "@/features/agent/utils/resolveSendTaskPresentation";
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
  const urlWantsOpen =
    searchParams.get(SEND_TASK_MODAL_QUERY_PARAM) ===
    SEND_TASK_MODAL_QUERY_VALUE;
  const capabilityFromUrl = searchParams.get("libraryCapabilityId") ?? "custom";
  const [keepAlive, setKeepAlive] = useState(urlWantsOpen);
  const [panelKey, setPanelKey] = useState(capabilityFromUrl);
  const [wasUrlOpen, setWasUrlOpen] = useState(urlWantsOpen);

  if (urlWantsOpen !== wasUrlOpen) {
    setWasUrlOpen(urlWantsOpen);
    if (urlWantsOpen) {
      setKeepAlive(true);
      setPanelKey(capabilityFromUrl);
    }
  }

  const presentation = resolveSendTaskPresentation({
    urlWantsOpen,
    keepAlive,
  });

  const closeSendTaskModal = useCallback(() => {
    setKeepAlive(false);
    const nextQuery = stripSendTaskModalQuery(searchParams);
    router.replace(`${pathname}${nextQuery}`, { scroll: false });
  }, [pathname, router, searchParams]);

  const openSendTaskModal = useCallback(
    (input?: {
      readonly libraryCapabilityId?: string;
      readonly prompt?: string;
      readonly deviceId?: string;
    }) => {
      setKeepAlive(true);
      router.push(buildAgentComposerHref({ ...input, pathname }), {
        scroll: false,
      });
    },
    [pathname, router],
  );

  const expandSendTaskModal = useCallback(() => {
    setKeepAlive(true);
    router.push(buildAgentComposerHref({ pathname }), { scroll: false });
  }, [pathname, router]);

  const minimizeSendTaskModal = useCallback(() => {
    setKeepAlive(true);
    const nextQuery = stripSendTaskModalQuery(searchParams);
    router.replace(`${pathname}${nextQuery}`, { scroll: false });
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
