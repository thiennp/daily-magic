"use client";

import { useCallback, useEffect, useState } from "react";

import {
  DEFAULT_PROJECT_PAGE_TAB,
  isProjectPageTabId,
  type ProjectPageTabId,
} from "@/features/projects/projectPageTabs.constant";
import { parseProjectPageHash } from "@/features/projects/utils/public-api/presentation";

const readHashTab = (): ProjectPageTabId => {
  if (typeof window === "undefined") {
    return DEFAULT_PROJECT_PAGE_TAB;
  }
  // `#library?item=…` / `#reports?report=…`: tab is the part before `?`.
  const { tab } = parseProjectPageHash(window.location.hash);
  return isProjectPageTabId(tab) ? tab : DEFAULT_PROJECT_PAGE_TAB;
};

const useAwcProjectDetailTab = (input: {
  readonly preferSettingsOnMount?: boolean;
}): {
  readonly activeTab: ProjectPageTabId;
  readonly setActiveTab: (tab: ProjectPageTabId) => void;
} => {
  const [activeTab, setActiveTabState] = useState<ProjectPageTabId>(() =>
    input.preferSettingsOnMount ? "settings" : readHashTab(),
  );

  useEffect(() => {
    if (!input.preferSettingsOnMount) {
      return;
    }
    if (window.location.hash !== "#settings") {
      window.history.replaceState(null, "", "#settings");
    }
  }, [input.preferSettingsOnMount]);

  useEffect(() => {
    const onHashChange = (): void => {
      setActiveTabState(readHashTab());
    };
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  const setActiveTab = useCallback((tab: ProjectPageTabId) => {
    setActiveTabState(tab);
    // Same tab: keep any `?item=` / `?report=` deep link already in the hash.
    if (parseProjectPageHash(window.location.hash).tab === tab) {
      return;
    }
    window.history.replaceState(null, "", `#${tab}`);
  }, []);

  return { activeTab, setActiveTab };
};

export default useAwcProjectDetailTab;
