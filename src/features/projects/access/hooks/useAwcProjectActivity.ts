"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { AwcProjectActivityAction } from "@/features/projects/access/awcProjectActivityActions.constant";
import { fetchProjectActivity } from "@/features/projects/access/utils/fetchProjectActivity";
import type AwcProjectActivityEvent from "@/features/projects/access/types/awcProjectActivityEvent.type";

export const useAwcProjectActivity = (
  projectId: string,
  refreshSignal: number = 0,
  enabled: boolean = true,
) => {
  const [events, setEvents] = useState<readonly AwcProjectActivityEvent[]>([]);
  const [filter, setFilter] = useState<AwcProjectActivityAction | "all">("all");
  const [isLoading, setIsLoading] = useState(enabled);
  const [unavailable, setUnavailable] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const reload = useCallback(async () => {
    if (!enabled) {
      return;
    }
    setIsLoading(true);
    const result = await fetchProjectActivity({
      projectId,
      actionFilter: filter,
    });
    if (result.ok) {
      setEvents(result.events);
      setUnavailable(false);
      setMessage(null);
    } else {
      setEvents([]);
      setUnavailable(result.unavailable);
      setMessage(result.errorMessage);
    }
    setIsLoading(false);
  }, [projectId, filter, enabled]);

  const loadGenerationRef = useRef(0);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const generation = loadGenerationRef.current + 1;
    loadGenerationRef.current = generation;

    const load = async (): Promise<void> => {
      setIsLoading(true);
      const result = await fetchProjectActivity({
        projectId,
        actionFilter: filter,
      });
      if (loadGenerationRef.current !== generation) {
        return;
      }
      if (result.ok) {
        setEvents(result.events);
        setUnavailable(false);
        setMessage(null);
      } else {
        setEvents([]);
        setUnavailable(result.unavailable);
        setMessage(result.errorMessage);
      }
      setIsLoading(false);
    };
    void load();
  }, [projectId, filter, refreshSignal, enabled]);

  return {
    events,
    filter,
    setFilter,
    isLoading: enabled ? isLoading : false,
    unavailable,
    message,
    reload,
  };
};
