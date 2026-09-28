import { PromptSdlcGuidePage } from "@/features/prompt-sdlc/public-api/presentation";
import AppShell from "@/features/shell/AppShell";

export const dynamic = "force-dynamic";

export default function PromptSdlcGuideRoutePage() {
  return (
    <AppShell>
      <PromptSdlcGuidePage />
    </AppShell>
  );
}
