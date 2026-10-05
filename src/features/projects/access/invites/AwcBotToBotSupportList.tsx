import {
  AWC_BOT_TO_BOT_SUPPORT_HEADING,
  AWC_BOT_TO_BOT_SUPPORT_ROWS,
  type AwcBotToBotSupportLevel,
} from "@/features/projects/access/invites/awcBotToBotSupportCopy.constant";

const ROW_CLASS: Readonly<Record<AwcBotToBotSupportLevel, string>> = {
  tested: "font-medium text-emerald-800 dark:text-emerald-300",
  hmac: "italic text-gray-500 dark:text-gray-400",
};

const MARKER: Readonly<Record<AwcBotToBotSupportLevel, string>> = {
  tested: "✓",
  hmac: "○",
};

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
            className={`flex gap-1.5 ${ROW_CLASS[row.level]}`}
          >
            <span aria-hidden="true">{MARKER[row.level]}</span>
            <span>{row.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
