"use client";

import { useCallback, useState } from "react";

import useAwcProjectDetailTab from "@/features/projects/hooks/useAwcProjectDetailTab";
import {
  isProjectPageTabId,
  type ProjectPageNavTarget,
  type ProjectPageTabId,
} from "@/features/projects/projectPageTabs.constant";

/** Project page tab + cross-section navigation (Team rail scroll, rename). Chat lives in the dock. */
const useAwcProjectDetailNavigation = (input: {
  readonly startRename: boolean;
  readonly isOwner: boolean;
}): {
  readonly activeTab: ProjectPageTabId;
  readonly setActiveTab: (tab: ProjectPageTabId) => void;
  readonly renameInSettings: boolean;
  readonly onGotoTab: (tab: ProjectPageNavTarget) => void;
  readonly onRename: () => void;
} => {
  const [renameInSettings, setRenameInSettings] = useState(
    input.startRename && input.isOwner,
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
  const onRename = useCallback(() => {
    setRenameInSettings(true);
    setActiveTab("settings");
  }, [setActiveTab]);

  return {
    activeTab,
    setActiveTab,
    renameInSettings,
    onGotoTab,
    onRename,
  };
};

export default useAwcProjectDetailNavigation;
