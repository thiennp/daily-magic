"use client";

import { useEffect, useId } from "react";

import SendTaskModalChrome from "@/features/agent/SendTaskModalChrome";
import WsTestPanel from "@/features/agent/WsTestPanel";
import type { SendTaskPresentation } from "@/features/agent/utils/resolveSendTaskPresentation";

interface SendTaskModalProps {
  readonly presentation: SendTaskPresentation;
  readonly panelKey: string;
  readonly onClose: () => void;
  readonly onExpand: () => void;
  readonly onMinimize: () => void;
}

export default function SendTaskModal({
  presentation,
  panelKey,
  onClose,
  onExpand,
  onMinimize,
}: SendTaskModalProps) {
  const titleId = useId();
  const isExpanded = presentation === "expanded";
  const isMinimized = presentation === "minimized";

  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        onMinimize();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isExpanded, onMinimize]);

  if (presentation === "hidden") {
    return null;
  }

  return (
    <div
      className={
        isExpanded
          ? "fixed inset-0 z-40 flex items-center justify-center overflow-y-auto modal"
          : "pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-end p-3 pb-20 md:p-4 md:pb-4"
      }
      role={isExpanded ? "dialog" : undefined}
      aria-modal={isExpanded ? true : undefined}
      aria-labelledby={isExpanded ? titleId : undefined}
    >
      {isExpanded ? (
        <button
          type="button"
          aria-label="Minimize send a task overlay"
          className="fixed inset-0 h-full w-full bg-gray-400/50 backdrop-blur-[32px]"
          onClick={onMinimize}
        />
      ) : null}
      <div
        className={
          isExpanded
            ? "relative z-10 max-h-[calc(100dvh-200px)] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white p-6 dark:bg-gray-800"
            : "pointer-events-auto relative max-h-72 w-full max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800"
        }
      >
        <SendTaskModalChrome
          titleId={titleId}
          isExpanded={isExpanded}
          onClose={onClose}
          onExpand={onExpand}
          onMinimize={onMinimize}
        />
        <div
          className={
            isExpanded ? "mt-6" : "relative max-h-52 overflow-y-auto p-3"
          }
        >
          <WsTestPanel key={panelKey} variant="modal" />
          {isMinimized ? (
            <button
              type="button"
              aria-label="Expand send a task"
              className="absolute inset-0 z-10 cursor-pointer bg-transparent"
              onClick={onExpand}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
