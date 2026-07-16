"use client";

import Button from "@/components/ui/button/Button";

interface AgentLiveTerminalNextActionsProps {
  readonly actions: readonly string[];
  readonly disabled: boolean;
  readonly onSelect: (action: string) => void;
}

export default function AgentLiveTerminalNextActions({
  actions,
  disabled,
  onSelect,
}: AgentLiveTerminalNextActionsProps) {
  if (actions.length === 0) {
    return null;
  }

  return (
    <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900/50">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
        Suggested next steps
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {actions.map((action) => (
          <Button
            key={action}
            size="sm"
            variant="outline"
            disabled={disabled}
            className="!px-3 !py-2 text-left"
            onClick={() => {
              onSelect(action);
            }}
          >
            {action}
          </Button>
        ))}
      </div>
    </div>
  );
}
