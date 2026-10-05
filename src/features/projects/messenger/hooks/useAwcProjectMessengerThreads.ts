"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { AwcMessengerThreadList } from "@/features/projects/messenger/types/awcProjectMessenger.type";
import { fetchMessengerThreads } from "@/features/projects/messenger/utils/fetchMessengerThreads";

export const useAwcProjectMessengerThreads = (projectId: string) => {
  const [threads, setThreads] = useState<AwcMessengerThreadList | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);
  const [forbidden, setForbidden] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const generationRef = useRef(0);

  const applyResult = useCallback(
    (result: Awaited<ReturnType<typeof fetchMessengerThreads>>) => {
      if (!result.ok) {
        setThreads(null);
        setUnavailable(result.unavailable);
        setForbidden(result.forbidden);
        setMessage(result.errorMessage);
        return;
      }
      setThreads(result.threads);
      setUnavailable(false);
      setForbidden(false);
      setMessage(null);
    },
    [],
  );

  const reload = useCallback(async () => {
    setIsLoading(true);
    const result = await fetchMessengerThreads({ projectId });
    applyResult(result);
    setIsLoading(false);
  }, [projectId, applyResult]);

  useEffect(() => {
    const generation = generationRef.current + 1;
    generationRef.current = generation;
    const load = async (): Promise<void> => {
      setIsLoading(true);
      const result = await fetchMessengerThreads({ projectId });
      if (generationRef.current !== generation) {
        return;
      }
      applyResult(result);
      setIsLoading(false);
    };
    void load();
  }, [projectId, applyResult]);

  return {
    threads,
    isLoading,
    unavailable,
    forbidden,
    message,
    reload,
  };
};
