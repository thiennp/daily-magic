import AgentWitchLogoMark from "@/components/branding/AgentWitchLogoMark";
import { APP_SHELL_V5_WORDMARK_CLASS } from "@/features/shell/v5/appShellV5Classes.constant";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

/**
 * Logo + wordmark (V5-2 topbar + mobile drawer, I19). No build/version pill:
 * the version lives next to Computers as "Latest v{n}".
 */
export default function AppShellBrand() {
  return (
    <span className="flex min-w-0 items-center gap-2">
      <AgentWitchLogoMark className="h-6 w-6 shrink-0 text-awc-blue-950 dark:text-zinc-100" />
      <span className={`truncate ${APP_SHELL_V5_WORDMARK_CLASS}`}>
        {AGENT_WITCH_PRODUCT_NAME}
      </span>
    </span>
  );
}
