import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export type PromptSdlcModelChoice =
  | {
      readonly kind: "writer";
      readonly writerAgent: HarnessWriterAgent;
    }
  | {
      readonly kind: "ollama";
      readonly model: string;
    };

export type PromptSdlcCallRole = "judge" | "improve";
