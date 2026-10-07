"use client";

import { useCallback, useState } from "react";

import { useAwcProjectMessengerLivePoll } from "@/features/projects/messenger/hooks/useAwcProjectMessengerLivePoll";
import { useAwcProjectMessengerThread } from "@/features/projects/messenger/hooks/useAwcProjectMessengerThread";
import { useAwcProjectMessengerThreads } from "@/features/projects/messenger/hooks/useAwcProjectMessengerThreads";

export const WHOLE_THREAD_KEY = "whole";

/**
 * P1-S2 One window feed state: the whole-project feed by default, or one
 * assistant's private feed when a caller deep-links to it (back → whole).
 * Thread list + open feed + live poll; marks read on open.
 */
export const useAwcProjectMessengerFeed = (input: {
  readonly projectId: string;
  readonly hasOwnerComputer: boolean;
  readonly initialThreadKey: string | null;
  readonly onUnreadMaybeChanged?: () => void;
}) => {
  const { projectId, hasOwnerComputer, onUnreadMaybeChanged } = input;
  const list = useAwcProjectMessengerThreads(projectId);
  const { reload: reloadThreads, reloadSilent: reloadThreadsSilent } = list;
  const [selectedKey, setSelectedKey] = useState<string>(
    input.initialThreadKey ?? WHOLE_THREAD_KEY,
  );
  const onOpened = useCallback(() => {
    void reloadThreads();
    onUnreadMaybeChanged?.();
  }, [onUnreadMaybeChanged, reloadThreads]);
  const open = useAwcProjectMessengerThread({
    projectId,
    threadKey: selectedKey,
    hasOwnerComputer,
    onOpened,
  });
  const reloadThreadSilent = open.reloadSilent;
  const onPollTick = useCallback(() => {
    void reloadThreadsSilent();
    void reloadThreadSilent();
    onUnreadMaybeChanged?.();
  }, [onUnreadMaybeChanged, reloadThreadSilent, reloadThreadsSilent]);
  useAwcProjectMessengerLivePoll({ enabled: !list.forbidden, onTick: onPollTick });
  const afterSend = async (ok: boolean): Promise<boolean> => {
    if (ok) {
      void reloadThreads();
      onUnreadMaybeChanged?.();
    }
    return ok;
  };
  return { list, open, selectedKey, setSelectedKey, afterSend };
};
