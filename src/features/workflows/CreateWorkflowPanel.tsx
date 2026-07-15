"use client";

import { useState } from "react";

import Button from "@/components/ui/button/Button";
import AppPanel from "@/components/surfaces/AppPanel";
import CreateWorkflowForm from "@/features/workflows/CreateWorkflowForm";

interface CreateWorkflowPanelProps {
  readonly onCreated: () => void;
}

export default function CreateWorkflowPanel({
  onCreated,
}: CreateWorkflowPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AppPanel>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Create workflow
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Define questions once — Agent turns answers into a prompt for your
            Mac. No automation canvas or code required.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            setIsOpen((open) => !open);
          }}
        >
          {isOpen ? "Hide form" : "New workflow"}
        </Button>
      </div>
      {isOpen ? (
        <CreateWorkflowForm
          onCreated={onCreated}
          onCancel={() => {
            setIsOpen(false);
          }}
        />
      ) : null}
    </AppPanel>
  );
}
