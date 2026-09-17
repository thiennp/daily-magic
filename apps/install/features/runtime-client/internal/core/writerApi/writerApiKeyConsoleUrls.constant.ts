import type { WriterApiProvider } from "./WriterApiProvider.constant";

export interface WriterApiKeyConsoleLink {
  readonly href: string;
  readonly label: string;
}

export const WRITER_API_KEY_CONSOLE_LINKS: Record<
  WriterApiProvider,
  WriterApiKeyConsoleLink
> = {
  anthropic: {
    href: "https://console.anthropic.com/settings/keys",
    label: "Get key",
  },
  openai: {
    href: "https://platform.openai.com/api-keys",
    label: "Get key",
  },
  google: {
    href: "https://aistudio.google.com/apikey",
    label: "Get key",
  },
};
