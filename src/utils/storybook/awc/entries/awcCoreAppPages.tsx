import AppPageHeader from "@/components/surfaces/AppPageHeader";
import AutomationsPageLayout from "@/features/pages/layouts/AutomationsPageLayout";
import LibraryPageLayout from "@/features/pages/layouts/LibraryPageLayout";
import MarketplacePageLayout from "@/features/pages/layouts/MarketplacePageLayout";
import ProjectsPageLayout from "@/features/pages/layouts/ProjectsPageLayout";
import ReportsPageLayout from "@/features/pages/layouts/ReportsPageLayout";
import AwcProjectDetailPanel from "@/features/projects/AwcProjectDetailPanel";
import { APP_PAGE_STACK_CLASS } from "@/features/shell/appPageLayout.constant";
import AwcHomeSignedInStoryView from "@/utils/storybook/AwcHomeSignedInStoryView";
import type { AwcStorybookPageEntry } from "@/utils/storybook/awc/awcStorybookPageEntry.type";
import { AWC_STORYBOOK_SAMPLE_PROJECT } from "@/utils/storybook/awcStorybookFixtures";
import type { StorybookPageStatus } from "@/utils/storybook/storybookPageStatus.constant";

const appStatuses: readonly StorybookPageStatus[] = [
  "loading",
  "guest",
  "empty",
  "error",
  "ready",
];

const signedInStatuses: readonly StorybookPageStatus[] = [
  "loading",
  "empty",
  "error",
  "ready",
];

export const AWC_CORE_APP_PAGE_ENTRIES: readonly AwcStorybookPageEntry[] = [
  {
    id: "home-signed-in",
    title: "Home (signed in)",
    path: "/",
    shell: "app",
    statuses: signedInStatuses,
    renderBody: () => <AwcHomeSignedInStoryView />,
  },
  {
    id: "projects",
    title: "Projects",
    path: "/projects",
    shell: "app-narrow",
    statuses: signedInStatuses,
    renderBody: () => <ProjectsPageLayout />,
  },
  {
    id: "project-detail",
    title: "Project detail",
    path: "/projects/:projectId",
    shell: "app-narrow",
    statuses: signedInStatuses,
    renderBody: () => (
      <div className={APP_PAGE_STACK_CLASS}>
        <AppPageHeader title="Project details" />
        <AwcProjectDetailPanel project={AWC_STORYBOOK_SAMPLE_PROJECT} />
      </div>
    ),
  },
  {
    id: "library",
    title: "Library",
    path: "/library",
    shell: "app",
    statuses: appStatuses,
    renderBody: () => <LibraryPageLayout />,
  },
  {
    id: "marketplace",
    title: "Marketplace",
    path: "/marketplace",
    shell: "app",
    statuses: appStatuses,
    renderBody: () => <MarketplacePageLayout />,
  },
  {
    id: "reports",
    title: "Reports",
    path: "/reports",
    shell: "app",
    statuses: appStatuses,
    renderBody: () => <ReportsPageLayout />,
  },
  {
    id: "automations",
    title: "Automations",
    path: "/automations",
    shell: "app",
    statuses: signedInStatuses,
    renderBody: () => <AutomationsPageLayout />,
  },
];
