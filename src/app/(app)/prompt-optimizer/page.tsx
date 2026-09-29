import PromptSdlcPage from "@/features/prompt-optimizer/public-api/presentation";
import AppShell from "@/features/shell/AppShell";

export const dynamic = "force-dynamic";

export default function PromptSdlcRoutePage() {
  return (
    <AppShell>
      <PromptSdlcPage />
    </AppShell>
  );
}
