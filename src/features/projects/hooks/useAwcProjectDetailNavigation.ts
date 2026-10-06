"use client";

import { useCallback, useState } from "react";

import useAwcProjectDetailTab from "@/features/projects/hooks/useAwcProjectDetailTab";
import {
  isProjectPageTabId,
  type ProjectPageNavTarget,
  type ProjectPageTabId,
} from "@/features/projects/projectPageTabs.constant";

/** Project page tab + cross-section navigation (Team rail scroll, Activity thread, rename). */
const useAwcProjectDetailNavigation = (input: {
  readonly startRename: boolean;
  readonly isOwner: boolean;
}): {
  readonly activeTab: ProjectPageTabId;
  readonly setActiveTab: (tab: ProjectPageTabId) => void;
  readonly renameInSettings: boolean;
  readonly activityThreadKey: string | null;
  readonly onGotoTab: (tab: ProjectPageNavTarget) => void;
  readonly onGotoActivity: (threadKey: string | null) => void;
  readonly onRename: () => void;
} => {
  const [renameInSettings, setRenameInSettings] = useState(
    input.startRename && input.isOwner,
  );
  const [activityThreadKey, setActivityThreadKey] = useState<string | null>(
    null,
  );
  const { activeTab, setActiveTab } = useAwcProjectDetailTab({
    preferSettingsOnMount: renameInSettings,
  });
  const onGotoTab = useCallback(
    (tab: ProjectPageNavTarget) => {
      if (isProjectPageTabId(tab)) {
        setActiveTab(tab);
        return;
      }
      if (tab === "team") {
        document
          .getElementById("project-members-column")
          ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    },
    [setActiveTab],
  );
  const onGotoActivity = useCallback(
    (threadKey: string | null) => {
      setActivityThreadKey(threadKey === null ? "whole" : threadKey);
      setActiveTab("activity");
    },
    [setActiveTab],
  );
  const onRename = useCallback(() => {
    setRenameInSettings(true);
    setActiveTab("settings");
  }, [setActiveTab]);

  return {
    activeTab,
    setActiveTab,
    renameInSettings,
    activityThreadKey,
    onGotoTab,
    onGotoActivity,
    onRename,
  };
};

export default useAwcProjectDetailNavigation;
