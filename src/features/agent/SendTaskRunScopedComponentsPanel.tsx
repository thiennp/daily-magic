"use client";

import { useEffect, useState } from "react";

import type { RunScopeComponentOption } from "@/lib/projects/listRunScopeComponentsForOwner";

interface SendTaskRunScopedComponentsPanelProps {
  readonly projectId: string;
  readonly selectedComponentIds: readonly string[];
  readonly onToggleComponentId: (componentId: string) => void;
}

export default function SendTaskRunScopedComponentsPanel({
  projectId,
  selectedComponentIds,
  onToggleComponentId,
}: SendTaskRunScopedComponentsPanelProps) {
  const [components, setComponents] = useState<
    readonly RunScopeComponentOption[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const load = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/projects/${encodeURIComponent(projectId)}/run-scope-components`,
          { signal: controller.signal },
        );
        if (!response.ok) {
          return;
        }
        const data: unknown = await response.json();
        if (
          typeof data === "object" &&
          data !== null &&
          (data as { ok?: unknown }).ok === true &&
          Array.isArray((data as { components?: unknown }).components)
        ) {
          setComponents(
            (data as { components: RunScopeComponentOption[] }).components,
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void load();

    return () => {
      controller.abort();
    };
  }, [projectId]);

  if (isLoading) {
    return (
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Loading pull-into-task components…
      </p>
    );
  }

  if (components.length === 0) {
    return null;
  }

  return (
    <div className="mb-4 rounded-lg border border-gray-200 p-3 dark:border-gray-700">
      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
        Pull into this task only
      </p>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        These components apply to this run without changing the project
        composition.
      </p>
      <ul className="mt-3 space-y-2">
        {components.map((component) => (
          <li key={component.componentId}>
            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                className="mt-0.5"
                checked={selectedComponentIds.includes(component.componentId)}
                onChange={() => {
                  onToggleComponentId(component.componentId);
                }}
              />
              <span>
                <span className="font-medium text-gray-800 dark:text-white/90">
                  {component.name}
                </span>
                <span className="ml-1 text-xs uppercase text-gray-500 dark:text-gray-400">
                  {component.kind}
                </span>
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
