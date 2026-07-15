"use client";

import { useState } from "react";

import Button from "@/components/ui/button/Button";
import AppPanel from "@/components/surfaces/AppPanel";
import CreateAgentForm from "@/features/capabilities/CreateAgentForm";
import CreateWorkflowForm from "@/features/workflows/CreateWorkflowForm";

type PlaybookTab = "workflow" | "agent";

interface CreatePlaybookPanelProps {
  readonly onCreated: () => void;
}

export default function CreatePlaybookPanel({
  onCreated,
}: CreatePlaybookPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<PlaybookTab>("workflow");

  return (
    <AppPanel>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Create workflow or agent
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Define prompts, questions, and optional rules — skills, shortcuts,
            instructions, and specialists that install to your Mac.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            setIsOpen((open) => !open);
          }}
        >
          {isOpen ? "Hide form" : "New playbook"}
        </Button>
      </div>
      {isOpen ? (
        <div className="mt-4">
          <div className="inline-flex rounded-lg border border-gray-200 p-1 dark:border-gray-700">
            <button
              type="button"
              onClick={() => {
                setActiveTab("workflow");
              }}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                activeTab === "workflow"
                  ? "bg-brand-500 text-white"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              Workflow
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("agent");
              }}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                activeTab === "agent"
                  ? "bg-brand-500 text-white"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              Agent
            </button>
          </div>
          {activeTab === "workflow" ? (
            <CreateWorkflowForm
              onCreated={onCreated}
              onCancel={() => {
                setIsOpen(false);
              }}
            />
          ) : (
            <CreateAgentForm
              onCreated={onCreated}
              onCancel={() => {
                setIsOpen(false);
              }}
            />
          )}
        </div>
      ) : null}
    </AppPanel>
  );
}
