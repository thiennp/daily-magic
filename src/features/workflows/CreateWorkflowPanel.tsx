"use client";

import { useState } from "react";

import Button from "@/components/ui/button/Button";
import { useDemoPreview } from "@/features/demo/DemoPreviewContext";
import CreateWorkflowForm from "@/features/workflows/CreateWorkflowForm";

interface CreateWorkflowPanelProps {
  readonly onCreated: () => void;
}

export default function CreateWorkflowPanel({
  onCreated,
}: CreateWorkflowPanelProps) {
  const demoPreview = useDemoPreview();
  const [isOpen, setIsOpen] = useState(false);

  if (demoPreview) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Create workflow
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Form fields assemble into a prompt — no n8n or code required.
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
    </section>
  );
}
