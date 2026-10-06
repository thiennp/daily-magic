"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { fetchProjectAccessLog } from "@/features/projects/activityLog/fetchProjectAccessLog";
import type {
  ProjectActivityCategory,
  ProjectActivityLogEvent,
  ProjectActivityLogRetention,
} from "@/features/projects/activityLog/projectAccessLog.type";

export type AccessLogCategoryFilter = ProjectActivityCategory | "all";

/** Thin wrapper over Invite fetch: cursor paging + category filter. */
export const useAwcAccessLog = (projectId: string, enabled: boolean) => {
  const [events, setEvents] = useState<readonly ProjectActivityLogEvent[]>([]);
  const [retention, setRetention] =
    useState<ProjectActivityLogRetention | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorMore, setErrorMore] = useState<string | null>(null);
  const [ownerOnly, setOwnerOnly] = useState(false);
  const [category, setCategory] = useState<AccessLogCategoryFilter>("all");
  const [reloadToken, setReloadToken] = useState(0);
  const cursorRef = useRef<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();
    void (async () => {
      setIsLoading(true);
      setError(null);
      setErrorMore(null);
      setOwnerOnly(false);
      const result = await fetchProjectAccessLog(
        {
          projectId,
          limit: 50,
          category: category === "all" ? null : category,
          cursor: null,
        },
        { signal: controller.signal },
      );
      if (controller.signal.aborted) return;
      if (!result.ok) {
        if (result.error === "owner_only") {
          setOwnerOnly(true);
          setEvents([]);
          setRetention(null);
          setNextCursor(null);
          cursorRef.current = null;
        } else {
          setError(result.error);
          setEvents([]);
        }
      } else {
        setRetention(result.data.retention ?? null);
        setNextCursor(result.data.nextCursor);
        cursorRef.current = result.data.nextCursor;
        setEvents(result.data.events);
      }
      setIsLoading(false);
    })();
    return () => controller.abort();
  }, [enabled, projectId, category, reloadToken]);

  const loadMore = useCallback(async () => {
    const cursor = cursorRef.current;
    if (!cursor || isLoadingMore) return;
    setIsLoadingMore(true);
    setErrorMore(null);
    const result = await fetchProjectAccessLog({
      projectId,
      limit: 50,
      category: category === "all" ? null : category,
      cursor,
    });
    if (!result.ok) {
      if (result.error !== "owner_only") setErrorMore(result.error);
    } else {
      setNextCursor(result.data.nextCursor);
      cursorRef.current = result.data.nextCursor;
      setEvents((prev) => [...prev, ...result.data.events]);
    }
    setIsLoadingMore(false);
  }, [projectId, category, isLoadingMore]);

  return {
    events, retention, nextCursor, isLoading, isLoadingMore, error, errorMore,
    ownerOnly, category, setCategory,
    reload: () => setReloadToken((n) => n + 1),
    loadMore: () => void loadMore(),
  };
};
