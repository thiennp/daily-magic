import AdminGroupsPageLayout from "@/features/pages/layouts/AdminGroupsPageLayout";
import { demoGroups } from "@/features/demo/mock/demoGroupsAndMembers";

export default function DemoAdminGroupsPage() {
  return <AdminGroupsPageLayout initialGroups={[...demoGroups]} />;
}
