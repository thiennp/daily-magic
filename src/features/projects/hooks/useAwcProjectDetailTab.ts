"use client";

import { useCallback, useEffect, useState } from "react";

import {
  DEFAULT_PROJECT_PAGE_TAB,
  isProjectPageTabId,
  type ProjectPageTabId,
} from "@/features/projects/projectPageTabs.constant";

const readHashTab = (): ProjectPageTabId => {
  if (typeof window === "undefined") {
    return DEFAULT_PROJECT_PAGE_TAB;
  }
  const raw = window.location.hash.replace(/^#/, "");
  return isProjectPageTabId(raw) ? raw : DEFAULT_PROJECT_PAGE_TAB;
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
    window.history.replaceState(null, "", `#${tab}`);
  }, []);

  return { activeTab, setActiveTab };
};

export default useAwcProjectDetailTab;
