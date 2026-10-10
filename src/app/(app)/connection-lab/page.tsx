import { ConnectionLabAppChrome } from "@/features/agent-witch/connection-lab/public-api/presentation";
import { requireStaffPageAccess } from "@/lib/auth/requireStaffPageAccess";

export default async function ConnectionLabPage() {
  await requireStaffPageAccess();

  return <ConnectionLabAppChrome />;
}
