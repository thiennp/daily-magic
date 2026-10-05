import {
  AWC_BOT_TO_BOT_SUPPORT_HEADING,
  AWC_BOT_TO_BOT_SUPPORT_ROWS,
} from "@/features/projects/access/invites/awcBotToBotSupportCopy.constant";

/** "Bot-to-bot works with" list, rendered from awcBotToBotSupportCopy.constant. */
export default function AwcBotToBotSupportList() {
  return (
    <div className="mt-2 text-[11px]" data-testid="awc-bot-to-bot-support">
      <p className="font-semibold text-gray-700 dark:text-white/80">
        {AWC_BOT_TO_BOT_SUPPORT_HEADING}
      </p>
      <ul className="mt-1 space-y-0.5">
        {AWC_BOT_TO_BOT_SUPPORT_ROWS.map((row) => (
          <li
            key={row.level}
            data-support-level={row.level}
            className="flex gap-1.5 font-medium text-gray-800 dark:text-white/90"
          >
            <span aria-hidden="true">●</span>
            <span>{row.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
