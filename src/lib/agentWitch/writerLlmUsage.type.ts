import type { WriterApiProvider } from "@/lib/agentWitch/writerApiProvider.type";

export default interface WriterLlmUsage {
  readonly provider: WriterApiProvider | "unknown";
  readonly model: string;
  readonly inputTokens: number;
  readonly outputTokens: number;
  readonly totalTokens: number;
  readonly estimatedCostUsd: number | null;
  readonly estimateIsApproximate: boolean;
}
