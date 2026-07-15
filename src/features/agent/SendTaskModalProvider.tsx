"use client";

import {
  createContext,
  Suspense,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import SendTaskModal from "@/features/agent/SendTaskModal";
import {
  SEND_TASK_MODAL_QUERY_PARAM,
  SEND_TASK_MODAL_QUERY_VALUE,
} from "@/features/agent/constants/sendTaskModalQuery.constant";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";
import { stripSendTaskModalQuery } from "@/features/agent/utils/stripSendTaskModalQuery";

interface SendTaskModalContextValue {
  readonly isOpen: boolean;
  readonly openSendTaskModal: (input?: {
    readonly libraryCapabilityId?: string;
    readonly prompt?: string;
  }) => void;
  readonly closeSendTaskModal: () => void;
}

const SendTaskModalContext = createContext<SendTaskModalContextValue | null>(
  null,
);

const isHomePath = (pathname: string): boolean => pathname === "/";

function SendTaskModalController({
  children,
}: {
  readonly children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isOpen =
    searchParams.get(SEND_TASK_MODAL_QUERY_PARAM) ===
    SEND_TASK_MODAL_QUERY_VALUE;

  const closeSendTaskModal = useCallback(() => {
    if (!isHomePath(pathname)) {
      return;
    }

    const nextQuery = stripSendTaskModalQuery(searchParams);
    router.replace(`${pathname}${nextQuery}`, { scroll: false });
  }, [pathname, router, searchParams]);

  const openSendTaskModal = useCallback(
    (input?: {
      readonly libraryCapabilityId?: string;
      readonly prompt?: string;
    }) => {
      router.push(buildAgentComposerHref(input), { scroll: false });
    },
    [router],
  );

  const value = useMemo(
    () => ({
      isOpen,
      openSendTaskModal,
      closeSendTaskModal,
    }),
    [closeSendTaskModal, isOpen, openSendTaskModal],
  );

  return (
    <SendTaskModalContext.Provider value={value}>
      {children}
      <SendTaskModal isOpen={isOpen} onClose={closeSendTaskModal} />
    </SendTaskModalContext.Provider>
  );
}

export function SendTaskModalProvider({
  children,
}: {
  readonly children: ReactNode;
}) {
  return (
    <Suspense fallback={children}>
      <SendTaskModalController>{children}</SendTaskModalController>
    </Suspense>
  );
}

export function useSendTaskModal(): SendTaskModalContextValue {
  const context = useContext(SendTaskModalContext);

  if (context === null) {
    throw new Error(
      "useSendTaskModal must be used within SendTaskModalProvider",
    );
  }

  return context;
}
