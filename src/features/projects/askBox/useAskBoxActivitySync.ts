"use client";

import { useCallback, useState } from "react";

/** After an ask-box send: refresh thread badges and reopen Activity on that thread. */
export const useAskBoxActivitySync = (input: {
  readonly reloadThreads: () => Promise<void>;
  readonly onGotoActivity: (threadKey: string | null) => void;
}) => {
  const { reloadThreads, onGotoActivity } = input;
  const [activityRefreshKey, setActivityRefreshKey] = useState(0);
  const onAskSent = useCallback(
    (threadKey: string) => {
      void reloadThreads();
      setActivityRefreshKey((n) => n + 1);
      onGotoActivity(threadKey);
    },
    [onGotoActivity, reloadThreads],
  );
  return { activityRefreshKey, onAskSent };
};
