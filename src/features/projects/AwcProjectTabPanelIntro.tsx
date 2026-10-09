import { PROJECT_V5_PANEL_SUBTITLE_CLASS } from "@/features/projects/projectPageV5ChromeClasses.constant";
import {
  PROJECT_PAGE_V5_SETTINGS_MEMBER_SUBTITLE,
  PROJECT_PAGE_V5_TAB_LABELS,
  PROJECT_PAGE_V5_TAB_SUBTITLES,
  type ProjectPageV5TabId,
} from "@/features/projects/projectPageV5Tabs.constant";

/**
 * V5-3 panel subtitle pattern: panel H2 is visually hidden (the project
 * name stays the one visible heading) + one-line subtitle.
 */
export default function AwcProjectTabPanelIntro({
  tabId,
  isOwner = true,
}: {
  readonly tabId: ProjectPageV5TabId;
  /** Non-owners get a Settings subtitle that does not promise rename/delete. */
  readonly isOwner?: boolean;
}) {
  return (
    <div className="min-w-0">
      <h2 className="sr-only">{PROJECT_PAGE_V5_TAB_LABELS[tabId]}</h2>
      <p className={PROJECT_V5_PANEL_SUBTITLE_CLASS}>
        {tabId === "settings" && !isOwner
          ? PROJECT_PAGE_V5_SETTINGS_MEMBER_SUBTITLE
          : PROJECT_PAGE_V5_TAB_SUBTITLES[tabId]}
      </p>
    </div>
  );
}
