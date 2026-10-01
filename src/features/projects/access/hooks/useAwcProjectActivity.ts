"use client";

import { useCallback, useEffect, useState } from "react";

import type { AwcProjectActivityAction } from "@/features/projects/access/awcProjectActivityActions.constant";
import { fetchProjectActivity } from "@/features/projects/access/utils/fetchProjectActivity";
import type AwcProjectActivityEvent from "@/features/projects/access/types/awcProjectActivityEvent.type";

export const useAwcProjectActivity = (projectId: string) => {
  const [events, setEvents] = useState<readonly AwcProjectActivityEvent[]>([]);
  const [filter, setFilter] = useState<AwcProjectActivityAction | "all">("all");
  const [isLoading, setIsLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const reload = useCallback(async () => {
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
  }, [projectId, filter]);

  useEffect(() => {
    const controller = new AbortController();
    const load = async (): Promise<void> => {
      setIsLoading(true);
      const result = await fetchProjectActivity({
        projectId,
        actionFilter: filter,
      });
      if (controller.signal.aborted) {
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
    return () => {
      controller.abort();
    };
  }, [projectId, filter]);

  return {
    events,
    filter,
    setFilter,
    isLoading,
    unavailable,
    message,
    reload,
  };
};
