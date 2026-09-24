"use client";

import { useEffect } from "react";

import { AGENT_ACCESS_TOOLS } from "@/lib/agentAccess/agentAccessTools.constant";

interface ModelContextTool {
  readonly name: string;
  readonly description: string;
  readonly inputSchema: unknown;
  readonly execute: (args: unknown) => Promise<{ readonly content: string }>;
}

interface ModelContext {
  readonly provideContext?: (context: {
    readonly tools: readonly ModelContextTool[];
  }) => void;
  readonly registerTool?: (tool: ModelContextTool) => void;
}

const readModelContext = (): ModelContext | null => {
  if (typeof navigator === "undefined") {
    return null;
  }

  const candidate = (navigator as Navigator & { modelContext?: ModelContext })
    .modelContext;

  return candidate ?? null;
};

const executeWebMcpTool = async (
  name: string,
  args: unknown,
): Promise<{ readonly content: string }> => {
  const token = window.sessionStorage.getItem("agentWitchAgentAccessToken");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token !== null && token.length > 0) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch("/api/agent-access/invoke", {
    method: "POST",
    headers,
    body: JSON.stringify({ name, arguments: args ?? {} }),
  });
  const payload: unknown = await response.json();

  if (
    name === "register_account" &&
    typeof payload === "object" &&
    payload !== null &&
    "token" in payload &&
    typeof payload.token === "string"
  ) {
    window.sessionStorage.setItem("agentWitchAgentAccessToken", payload.token);
  }

  return { content: JSON.stringify(payload) };
};

export default function AgentAccessWebMcpBridge(): null {
  useEffect(() => {
    const modelContext = readModelContext();

    if (modelContext === null) {
      return;
    }

    const tools: ModelContextTool[] = AGENT_ACCESS_TOOLS.map((tool) => ({
      name: tool.name,
      description: tool.description,
      inputSchema: tool.inputSchema,
      execute: (args) => executeWebMcpTool(tool.name, args),
    }));

    if (modelContext.provideContext) {
      modelContext.provideContext({ tools });
      return;
    }

    tools.forEach((tool) => {
      modelContext.registerTool?.(tool);
    });
  }, []);

  return null;
}
