"use client";

import { useCallback, useEffect, useState } from "react";

import type { AwcMessengerThreadList } from "@/features/projects/messenger/types/awcProjectMessenger.type";
import { fetchMessengerThreads } from "@/features/projects/messenger/utils/fetchMessengerThreads";

export const useAwcProjectMessengerThreads = (projectId: string) => {
  const [threads, setThreads] = useState<AwcMessengerThreadList | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);
  const [forbidden, setForbidden] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const reload = useCallback(async () => {
    const result = await fetchMessengerThreads({ projectId });
    if (!result.ok) {
      setThreads(null);
      setUnavailable(result.unavailable);
      setForbidden(result.forbidden);
      setMessage(result.errorMessage);
      setIsLoading(false);
      return;
    }
    setThreads(result.threads);
    setUnavailable(false);
    setForbidden(false);
    setMessage(null);
    setIsLoading(false);
  }, [projectId]);

  useEffect(() => {
    setIsLoading(true);
    void reload();
  }, [reload]);

  return {
    threads,
    isLoading,
    unavailable,
    forbidden,
    message,
    reload,
  };
};
