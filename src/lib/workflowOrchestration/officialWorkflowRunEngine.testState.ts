import { randomUUID } from "node:crypto";

/** Mutable dispatch outcome shared by orchestration engine tests and their mock. */
export const officialWorkflowDispatchTestState: {
  shouldFail: boolean;
  lastRunId: string;
} = {
  shouldFail: false,
  lastRunId: "",
};

export const buildMockedDispatchResult = (): Record<string, unknown> => {
  if (officialWorkflowDispatchTestState.shouldFail) {
    return {
      ok: false,
      message: {
        type: "system.error",
        payload: { message: "No Mac connected." },
      },
    };
  }

  officialWorkflowDispatchTestState.lastRunId = `agent-run-${randomUUID()}`;

  return {
    ok: true,
    message: { type: "command.claude.result" },
    run: { id: officialWorkflowDispatchTestState.lastRunId },
  };
};
