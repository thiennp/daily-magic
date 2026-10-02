import AdminGroupsPageLayout from "@/features/pages/layouts/AdminGroupsPageLayout";
import ReportDetailPageLayout from "@/features/pages/layouts/ReportDetailPageLayout";
import ConnectionLabPageLayout from "@/features/agent-witch/connection-lab/ConnectionLabPageLayout";
import UserManagementPanel from "@/features/admin/UserManagementPanel";
import PromptSdlcGuidePage from "@/features/prompt-optimizer/internal/presentation/PromptSdlcGuidePage";
import PromptSdlcPage from "@/features/prompt-optimizer/internal/presentation/PromptSdlcPage";
import ShowcasesIndexPageLayout from "@/features/showcases/ShowcasesIndexPageLayout";
import type { AwcStorybookPageEntry } from "@/utils/storybook/awc/awcStorybookPageEntry.type";
import {
  AWC_STORYBOOK_SAMPLE_ADMIN_USERS,
  AWC_STORYBOOK_SAMPLE_GROUPS,
} from "@/utils/storybook/awcStorybookFixtures";
import type { StorybookPageStatus } from "@/utils/storybook/storybookPageStatus.constant";

const signedInStatuses: readonly StorybookPageStatus[] = [
  "loading",
  "empty",
  "error",
  "ready",
];

export const AWC_SECONDARY_APP_PAGE_ENTRIES: readonly AwcStorybookPageEntry[] =
  [
    {
      id: "report-detail",
      title: "Report detail",
      path: "/reports/:runId",
      shell: "app",
      statuses: signedInStatuses,
      renderBody: () => (
        <>
          <h1 className="sr-only">Report detail</h1>
          <ReportDetailPageLayout runId="run-storybook-1" />
        </>
      ),
    },
    {
      id: "prompt-optimizer",
      title: "Prompt optimizer",
      path: "/prompt-optimizer",
      shell: "app",
      statuses: ["ready"],
      renderBody: () => <PromptSdlcPage />,
    },
    {
      id: "prompt-optimizer-guide",
      title: "Prompt optimizer guide",
      path: "/prompt-optimizer/guide",
      shell: "app",
      statuses: ["ready"],
      renderBody: () => <PromptSdlcGuidePage />,
    },
    {
      id: "connection-lab",
      title: "Connection lab",
      path: "/connection-lab",
      shell: "app",
      statuses: ["ready", "error"],
      renderBody: () => <ConnectionLabPageLayout />,
    },
    {
      id: "showcases",
      title: "Showcases",
      path: "/showcases",
      shell: "marketing",
      statuses: ["ready"],
      renderBody: () => <ShowcasesIndexPageLayout />,
    },
    {
      id: "admin-users",
      title: "Admin users",
      path: "/admin/users",
      shell: "admin",
      statuses: ["ready", "empty"],
      renderBody: (status) => (
        <UserManagementPanel
          initialUsers={
            status === "empty" ? [] : [...AWC_STORYBOOK_SAMPLE_ADMIN_USERS]
          }
        />
      ),
    },
    {
      id: "admin-groups",
      title: "Admin groups",
      path: "/admin/groups",
      shell: "admin",
      statuses: ["ready", "empty", "error"],
      renderBody: (status) => (
        <AdminGroupsPageLayout
          initialGroups={status === "empty" ? [] : AWC_STORYBOOK_SAMPLE_GROUPS}
        />
      ),
    },
  ];
