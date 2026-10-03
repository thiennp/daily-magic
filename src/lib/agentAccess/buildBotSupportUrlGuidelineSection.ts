import {
  BOT_SUPPORT_URL_INSTRUCTION,
  BOT_SUPPORT_URL_KINDS,
  BOT_SUPPORT_URL_LABEL,
} from "@/lib/projects/botSupportUrlKind.constant";

/** Where bots already read support-URL guidance (`/for-agents`). */
export const buildBotSupportUrlGuidelineSection = (): {
  readonly heading: string;
  readonly body: readonly string[];
} => ({
  heading: "Support URLs",
  body: [
    "When the owner stores a support URL, follow the predefined instruction for its kind. Do not treat it as a blank link.",
    ...BOT_SUPPORT_URL_KINDS.map(
      (kind) =>
        `${BOT_SUPPORT_URL_LABEL[kind]} (${kind}): ${BOT_SUPPORT_URL_INSTRUCTION[kind]}`,
    ),
  ],
});
