import ConnectionLabAppChrome from "@/features/agent-witch/connection-lab/ConnectionLabAppChrome";
import { requireStaffPageAccess } from "@/lib/auth/requireStaffPageAccess";

export default async function ConnectionLabPage() {
  await requireStaffPageAccess();

  return <ConnectionLabAppChrome />;
}
