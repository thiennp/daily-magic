export const WRITER_API_PROVIDERS = ["anthropic", "openai", "google"] as const;

export type WriterApiProvider = (typeof WRITER_API_PROVIDERS)[number];

export const DEFAULT_WRITER_API_MODELS: Record<WriterApiProvider, string> = {
  anthropic: "claude-sonnet-4-20250514",
  openai: "gpt-4.1-mini",
  google: "gemini-2.0-flash",
};
