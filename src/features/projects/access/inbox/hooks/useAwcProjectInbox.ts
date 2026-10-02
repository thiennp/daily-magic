"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  loadAwcProjectInbox,
  type AwcProjectInboxSnapshot,
} from "@/features/projects/access/inbox/hooks/loadAwcProjectInbox";
import type AwcProjectInboxMessage from "@/features/projects/access/inbox/types/awcProjectInboxMessage.type";
import { ackProjectInboxMessage } from "@/features/projects/access/inbox/utils/ackProjectInboxMessage";
import type { AccessMembershipView } from "@/features/projects/access/utils/projectAccessApi.types";

const emptyMembers: readonly AccessMembershipView[] = [];

export const useAwcProjectInbox = (
  projectId: string,
  enabled: boolean = true,
) => {
  const [messages, setMessages] = useState<readonly AwcProjectInboxMessage[]>(
    [],
  );
  const [members, setMembers] =
    useState<readonly AccessMembershipView[]>(emptyMembers);
  const [isLoading, setIsLoading] = useState(enabled);
  const [unavailable, setUnavailable] = useState(false);
  const [forbidden, setForbidden] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const generationRef = useRef(0);

  const applySnapshot = useCallback((snapshot: AwcProjectInboxSnapshot) => {
    setMembers(snapshot.members);
    if (snapshot.ok) {
      setMessages(snapshot.messages);
      setUnavailable(false);
      setForbidden(false);
      setMessage(null);
      return;
    }
    setMessages([]);
    setUnavailable(snapshot.unavailable);
    setForbidden(snapshot.forbidden);
    setMessage(snapshot.errorMessage);
  }, []);

  const reload = useCallback(
    async (silent: boolean = false) => {
      if (!enabled) {
        return;
      }
      if (!silent) {
        setIsLoading(true);
      }
      const snapshot = await loadAwcProjectInbox(projectId);
      applySnapshot(snapshot);
      if (!silent) {
        setIsLoading(false);
      }
    },
    [projectId, enabled, applySnapshot],
  );

  useEffect(() => {
    if (!enabled) {
      return;
    }
    const generation = generationRef.current + 1;
    generationRef.current = generation;
    const load = async (): Promise<void> => {
      setIsLoading(true);
      const snapshot = await loadAwcProjectInbox(projectId);
      if (generationRef.current !== generation) {
        return;
      }
      applySnapshot(snapshot);
      setIsLoading(false);
    };
    void load();
  }, [projectId, enabled, applySnapshot]);

  const ack = useCallback(
    async (messageId: string): Promise<boolean> => {
      const result = await ackProjectInboxMessage({ projectId, messageId });
      if (result.ok) {
        setMessages((current) =>
          current.filter((row) => row.messageId !== messageId),
        );
      }
      return result.ok;
    },
    [projectId],
  );

  const reloadLoud = useCallback(() => reload(false), [reload]);
  const reloadSilent = useCallback(() => reload(true), [reload]);

  return {
    messages,
    members,
    isLoading: enabled ? isLoading : false,
    unavailable,
    forbidden,
    message,
    reload: reloadLoud,
    reloadSilent,
    ack,
  };
};
