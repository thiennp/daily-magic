export const CAPABILITY_USAGE_WRITER_OPTIONS = [
  "anthropic",
  "openai",
  "cursor",
  "google",
] as const;

export type CapabilityUsageWriterOption =
  (typeof CAPABILITY_USAGE_WRITER_OPTIONS)[number];

export default interface CapabilityTemplateUsageGuide {
  readonly summary: string;
  readonly prerequisites: readonly string[];
  readonly steps: readonly {
    readonly title: string;
    readonly body: string;
  }[];
  readonly whenToUse: string;
  readonly whenNotToUse?: string;
  readonly estimatedMinutes?: number;
  readonly supportedWriters: readonly CapabilityUsageWriterOption[];
}
