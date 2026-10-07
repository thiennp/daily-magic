import AwcProjectDetailSkeleton from "@/features/projects/AwcProjectDetailSkeleton";
import AppShell from "@/features/shell/AppShell";

/**
 * DF-016: project page route skeleton — covers Overview / Tasks / Library /
 * Settings tabs and the Members rail (all live inside this route).
 */
export default function ProjectDetailLoading() {
  return (
    <AppShell>
      <AwcProjectDetailSkeleton />
    </AppShell>
  );
}
