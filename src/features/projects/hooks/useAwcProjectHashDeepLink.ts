"use client";

import { useCallback, useEffect, useState } from "react";

import type { ProjectPageTabId } from "@/features/projects/public-api/types";
import { readProjectPageHashParam } from "@/features/projects/utils/public-api/presentation";
import { buildProjectTabHash } from "@/lib/shell/buildNavConsolidationRedirect";

const readParam = (tab: ProjectPageTabId, key: string): string | null =>
  typeof window === "undefined"
    ? null
    : readProjectPageHashParam(window.location.hash, tab, key);

/**
 * Selected item id kept in the project hash: `#library?item=<id>` /
 * `#reports?report=<id>` / `#tasks?task=<id>`. Read on mount + hashchange;
 * opening or closing an item rewrites the hash with replaceState (no spam).
 */
const useAwcProjectHashDeepLink = (
  tab: "library" | "reports" | "tasks",
  key: "item" | "report" | "task" | "record",
): readonly [string | null, (id: string | null) => void] => {
  const [selectedId, setSelectedIdState] = useState<string | null>(() =>
    readParam(tab, key),
  );

  useEffect(() => {
    const onHashChange = (): void => {
      setSelectedIdState(readParam(tab, key));
    };
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [tab, key]);

  const setSelectedId = useCallback(
    (id: string | null) => {
      setSelectedIdState(id);
      const hash = buildProjectTabHash(tab, id === null ? {} : { [key]: id });
      window.history.replaceState(null, "", hash);
    },
    [tab, key],
  );

  return [selectedId, setSelectedId] as const;
};

export default useAwcProjectHashDeepLink;
