import { BOT_SUPPORT_URL_LABEL } from "@/lib/projects/botSupportUrlKind.constant";
import { detectBotSupportUrlKind } from "@/lib/projects/detectBotSupportUrlKind";

interface AwcBotSupportUrlKindLabelProps {
  readonly url: string;
}

/** Shows the predefined type so a person sees what AgentWitch can store. */
export default function AwcBotSupportUrlKindLabel({
  url,
}: AwcBotSupportUrlKindLabelProps) {
  const trimmed = url.trim();
  if (trimmed.length === 0) {
    return null;
  }
  const kind = detectBotSupportUrlKind(trimmed);
  return (
    <span
      className="text-[11px] font-medium uppercase tracking-wide text-awc-fg-muted dark:text-gray-400"
      data-bot-support-url-kind={kind}
    >
      {BOT_SUPPORT_URL_LABEL[kind]}
    </span>
  );
}
