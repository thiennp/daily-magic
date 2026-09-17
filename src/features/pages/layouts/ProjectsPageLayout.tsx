import AppPageHeader from "@/components/surfaces/AppPageHeader";
import AwcProjectsPanel from "@/features/projects/AwcProjectsPanel";
import { APP_PAGE_STACK_CLASS } from "@/features/shell/appPageLayout.constant";

export default function ProjectsPageLayout() {
  return (
    <div className={APP_PAGE_STACK_CLASS}>
      <AppPageHeader
        title="Projects"
        description="Repos your Macs can run agents against. Edit composition and folders in Agent Witch Live on each Mac."
      />
      <AwcProjectsPanel />
    </div>
  );
}
