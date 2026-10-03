/** Predefined bot-support URL kinds. Client-only — no API field. */
export const BOT_SUPPORT_URL_KINDS = [
  "github",
  "linkedin",
  "notebooklm",
  "link",
] as const;

export type BotSupportUrlKind = (typeof BOT_SUPPORT_URL_KINDS)[number];

export const BOT_SUPPORT_URL_LABEL: Record<BotSupportUrlKind, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  notebooklm: "NotebookLM",
  link: "Link",
};

/** Host pattern each kind matches. `link` is the fallback. */
export const BOT_SUPPORT_URL_HOST_PATTERN: Record<BotSupportUrlKind, string> = {
  github: "github.com and its subdomains",
  linkedin: "linkedin.com, including country subdomains",
  notebooklm:
    "notebooklm.google.com, or a google.com URL whose path contains notebooklm",
  link: "any other URL",
};

export const BOT_SUPPORT_URL_INSTRUCTION: Record<BotSupportUrlKind, string> = {
  github:
    "Read the repo, issue, or pull request this URL points at. Do not push or open a pull request unless the owner asked.",
  linkedin:
    "Read this profile or page for context. Do not message anyone or send a connection as the owner.",
  notebooklm:
    "Use this as the owner's notebook. Read it for the task. Do not create or delete notebooks unless the owner asked.",
  link: "Open it only for the task the owner named; do not post, pay, or change the account.",
};
