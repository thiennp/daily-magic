import ConnectionLabPageLayout from "@/features/agent-witch/connection-lab/ConnectionLabPageLayout";
import { requireStaffPageAccess } from "@/lib/auth/requireStaffPageAccess";

export default async function ConnectionLabPage() {
  await requireStaffPageAccess();

  return <ConnectionLabPageLayout />;
}
