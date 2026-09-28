import { redirect } from "next/navigation";

import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";
import { requireStaffPageAccess } from "@/lib/auth/requireStaffPageAccess";

export default async function WsTestPage() {
  await requireStaffPageAccess();
  redirect(buildAgentComposerHref());
}
