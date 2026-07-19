"use client";

import { createContext, Suspense, useContext, type ReactNode } from "react";

import SendTaskModal from "@/features/agent/SendTaskModal";
import { useSendTaskModalController } from "@/features/agent/hooks/useSendTaskModalController";

interface SendTaskModalContextValue {
  readonly isOpen: boolean;
  readonly openSendTaskModal: (input?: {
    readonly libraryCapabilityId?: string;
    readonly prompt?: string;
    readonly deviceId?: string;
  }) => void;
  readonly closeSendTaskModal: () => void;
}

const SendTaskModalContext = createContext<SendTaskModalContextValue | null>(
  null,
);

const SEND_TASK_MODAL_SUSPENSE_FALLBACK: SendTaskModalContextValue = {
  isOpen: false,
  openSendTaskModal: () => undefined,
  closeSendTaskModal: () => undefined,
};

function SendTaskModalController({
  children,
}: {
  readonly children: ReactNode;
}) {
  const controller = useSendTaskModalController();

  return (
    <SendTaskModalContext.Provider
      value={{
        isOpen: controller.isOpen,
        openSendTaskModal: controller.openSendTaskModal,
        closeSendTaskModal: controller.closeSendTaskModal,
      }}
    >
      {children}
      <SendTaskModal
        presentation={controller.presentation}
        panelKey={controller.panelKey}
        onClose={controller.closeSendTaskModal}
        onExpand={controller.expandSendTaskModal}
        onMinimize={controller.minimizeSendTaskModal}
        onSessionActiveChange={controller.onSessionActiveChange}
      />
    </SendTaskModalContext.Provider>
  );
}

export function SendTaskModalProvider({
  children,
}: {
  readonly children: ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <SendTaskModalContext.Provider
          value={SEND_TASK_MODAL_SUSPENSE_FALLBACK}
        >
          {children}
        </SendTaskModalContext.Provider>
      }
    >
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
