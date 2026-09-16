export const WRITER_API_PROVIDERS = ["anthropic", "openai", "google"] as const;

export type WriterApiProvider = (typeof WRITER_API_PROVIDERS)[number];
