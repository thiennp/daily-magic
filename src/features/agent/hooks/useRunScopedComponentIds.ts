"use client";

import { useCallback, useState } from "react";

const useRunScopedComponentIds = (): {
  readonly runScopedComponentIds: readonly string[];
  readonly toggleRunScopedComponentId: (componentId: string) => void;
  readonly clearRunScopedComponentIds: () => void;
} => {
  const [runScopedComponentIds, setRunScopedComponentIds] = useState<
    readonly string[]
  >([]);

  const toggleRunScopedComponentId = useCallback((componentId: string) => {
    const trimmed = componentId.trim();
    if (trimmed.length === 0) {
      return;
    }

    setRunScopedComponentIds((current) =>
      current.includes(trimmed)
        ? current.filter((id) => id !== trimmed)
        : [...current, trimmed],
    );
  }, []);

  const clearRunScopedComponentIds = useCallback(() => {
    setRunScopedComponentIds([]);
  }, []);

  return {
    runScopedComponentIds,
    toggleRunScopedComponentId,
    clearRunScopedComponentIds,
  };
};

export default useRunScopedComponentIds;
