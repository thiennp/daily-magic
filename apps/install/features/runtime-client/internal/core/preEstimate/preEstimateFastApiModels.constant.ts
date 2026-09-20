import type { WriterApiProvider } from "../writerApi/WriterApiProvider.constant";

/** Prefer flash/mini tiers for one-shot time estimates (cost + latency). */
export const PRE_ESTIMATE_FAST_API_PROVIDER_ORDER: readonly WriterApiProvider[] =
  ["google", "openai", "anthropic"];

export const PRE_ESTIMATE_FAST_API_MODELS: Record<WriterApiProvider, string> = {
  google: "gemini-2.0-flash",
  openai: "gpt-4.1-mini",
  anthropic: "claude-3-5-haiku-20241022",
};
