import { OW_GONE_CLASS } from "@/features/projects/messenger/oneWindow/awcOneWindowChrome.constant";
import { ONE_WINDOW_COMPOSER_COPY } from "@/features/projects/messenger/oneWindow/oneWindowComposerCopy.constant";
import type { OneWindowMentionAssistant } from "@/features/projects/messenger/oneWindow/oneWindowMentions";

interface AwcOneWindowKeptRetryNoticeProps {
  readonly pendingKeys: readonly string[];
  readonly assistants: readonly OneWindowMentionAssistant[];
}

/** P1-S5b: kept send stopped part-way — who has not got this draft yet. */
export default function AwcOneWindowKeptRetryNotice({
  pendingKeys,
  assistants,
}: AwcOneWindowKeptRetryNoticeProps) {
  const names = pendingKeys.map(
    (key) => assistants.find((a) => a.membershipId === key)?.displayName ?? "an assistant",
  );
  return (
    <div className={OW_GONE_CLASS} role="status">
      {ONE_WINDOW_COMPOSER_COPY.keptRetry.replace("{names}", names.join(", "))}
    </div>
  );
}
