import AppPageHeader from "@/components/surfaces/AppPageHeader";
import HomeProjectsPanel from "@/features/home/HomeProjectsPanel";
import { APP_PAGE_STACK_CLASS } from "@/features/shell/appPageLayout.constant";

export default function ProjectsPageLayout() {
  return (
    <div className={APP_PAGE_STACK_CLASS}>
      <AppPageHeader
        title="Projects"
        description="Choose where tasks run on this Mac and start work in the right repository."
      />
      <HomeProjectsPanel />
    </div>
  );
}
