import AwcProjectsListSkeleton from "@/features/projects/AwcProjectsListSkeleton";
import AppShell from "@/features/shell/AppShell";
import { APP_SHELL_NARROW_CONTENT_CLASS } from "@/features/shell/appShellContentWidth.constant";

/** DF-016: /projects route skeleton (matches ProjectsPage shell width). */
export default function ProjectsLoading() {
  return (
    <AppShell contentClassName={APP_SHELL_NARROW_CONTENT_CLASS}>
      <AwcProjectsListSkeleton />
    </AppShell>
  );
}
