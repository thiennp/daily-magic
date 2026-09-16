import type { AgentWitchLocalLayout } from "./resolveAgentWitchLocalLayout";
import { recordAgentWitchLocalTraceEvent } from "./agentWitchLocalWsTraceLog";

let registered = false;

export const registerAgentWitchProcessTraceHandlers = (
  layout: AgentWitchLocalLayout,
): void => {
  if (registered) {
    return;
  }
  registered = true;

  process.on("uncaughtException", (error: Error) => {
    recordAgentWitchLocalTraceEvent(layout, {
      kind: "crash",
      message: error.message,
      stack: error.stack,
    });
  });

  process.on("unhandledRejection", (reason: unknown) => {
    const message =
      reason instanceof Error
        ? reason.message
        : typeof reason === "string"
          ? reason
          : "Unhandled promise rejection";
    const stack = reason instanceof Error ? reason.stack : undefined;
    recordAgentWitchLocalTraceEvent(layout, {
      kind: "crash",
      message,
      stack,
    });
  });
};
