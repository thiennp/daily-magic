import { PromptSdlcGuidePage } from "@/features/prompt-optimizer/public-api/presentation";
import { AppShell } from "@/features/shell/public-api/presentation";

export const dynamic = "force-dynamic";

export default function PromptSdlcGuideRoutePage() {
  return (
    <AppShell>
      <PromptSdlcGuidePage />
    </AppShell>
  );
}
