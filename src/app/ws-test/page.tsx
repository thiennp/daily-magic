import { redirect } from "next/navigation";

import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";

export default function WsTestPage() {
  redirect(buildAgentComposerHref());
}
