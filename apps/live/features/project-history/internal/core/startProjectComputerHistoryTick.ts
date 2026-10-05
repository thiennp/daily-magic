import { PROJECT_COMPUTER_HISTORY_TICK_INTERVAL_MS } from "./projectHistory.constants";
import { tickProjectComputerHistory } from "./tickProjectComputerHistory";

export type ProjectComputerHistoryTickHandle = {
  readonly stop: () => void;
};

/**
 * ONE History timer for the AWL live server lifecycle.
 * Do not use the automations tick; do not add a second timer elsewhere.
 */
export const startProjectComputerHistoryTick = (input?: {
  readonly intervalMs?: number;
  readonly tick?: () => void | Promise<void>;
}): ProjectComputerHistoryTickHandle => {
  const intervalMs = input?.intervalMs ?? PROJECT_COMPUTER_HISTORY_TICK_INTERVAL_MS;
  const tick = input?.tick ?? (() => tickProjectComputerHistory());
  void tick();
  const timer = setInterval(() => {
    void tick();
  }, intervalMs);
  return {
    stop: () => {
      clearInterval(timer);
    },
  };
};
