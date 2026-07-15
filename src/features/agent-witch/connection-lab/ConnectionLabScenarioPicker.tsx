"use client";

import type { ConnectionScenarioId } from "@/lib/agentWitch/mock/connectionScenario.types";
import { useConnectionLabScenario } from "@/features/agent-witch/connection-lab/ConnectionLabContext";

export default function ConnectionLabScenarioPicker() {
  const { scenarioId, setScenarioId, scenarioLabels } =
    useConnectionLabScenario();

  return (
    <div className="flex flex-wrap gap-2">
      {(Object.keys(scenarioLabels) as ConnectionScenarioId[]).map((id) => (
        <button
          key={id}
          type="button"
          onClick={() => {
            setScenarioId(id);
          }}
          className={
            id === scenarioId
              ? "rounded-lg bg-brand-500 px-3 py-1.5 text-sm font-medium text-white"
              : "rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-800"
          }
        >
          {scenarioLabels[id]}
        </button>
      ))}
    </div>
  );
}
