import {
  BOT_SUPPORT_URL_INSTRUCTION,
  type BotSupportUrlKind,
} from "@/lib/projects/botSupportUrlKind.constant";

const hostOf = (url: string): { host: string; path: string } | null => {
  const trimmed = url.trim();
  const scp = /^git@([^:\s]+):(\S+)$/iu.exec(trimmed);
  if (scp?.[1]) {
    return { host: scp[1].toLowerCase(), path: scp[2] ?? "" };
  }
  const withScheme = /^[a-z][a-z0-9+.-]*:/iu.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;
  try {
    const parsed = new URL(withScheme);
    return {
      host: parsed.hostname.toLowerCase(),
      path: parsed.pathname.toLowerCase(),
    };
  } catch {
    return null;
  }
};

const isHostOrSubdomain = (host: string, root: string): boolean =>
  host === root || host.endsWith(`.${root}`);

/** Detect a predefined support-URL kind. Unknown URLs are `link`. */
export const detectBotSupportUrlKind = (url: string): BotSupportUrlKind => {
  const parsed = hostOf(url);
  if (parsed === null || parsed.host.length === 0) {
    return "link";
  }
  if (isHostOrSubdomain(parsed.host, "github.com")) {
    return "github";
  }
  if (isHostOrSubdomain(parsed.host, "linkedin.com")) {
    return "linkedin";
  }
  if (isHostOrSubdomain(parsed.host, "notebooklm.google.com")) {
    return "notebooklm";
  }
  if (
    isHostOrSubdomain(parsed.host, "google.com") &&
    parsed.path.includes("notebooklm")
  ) {
    return "notebooklm";
  }
  return "link";
};

export const botSupportUrlInstruction = (url: string): string =>
  BOT_SUPPORT_URL_INSTRUCTION[detectBotSupportUrlKind(url)];
