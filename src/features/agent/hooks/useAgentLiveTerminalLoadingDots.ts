import { useEffect, useState } from "react";

const LOADING_DOT_PHASES = [1, 2, 3] as const;
const LOADING_DOT_INTERVAL_MS = 500;

export const useAgentLiveTerminalLoadingDots = (active: boolean): number => {
  const [phaseIndex, setPhaseIndex] = useState(0);

  useEffect(() => {
    if (!active) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setPhaseIndex((current) => (current + 1) % LOADING_DOT_PHASES.length);
    }, LOADING_DOT_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [active]);

  if (!active) {
    return 1;
  }

  return LOADING_DOT_PHASES[phaseIndex] ?? 1;
};
