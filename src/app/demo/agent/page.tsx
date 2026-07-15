import { redirect } from "next/navigation";

import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";

export default function DemoAgentPage() {
  redirect(`/demo/home${buildAgentComposerHref().slice(1)}`);
}
