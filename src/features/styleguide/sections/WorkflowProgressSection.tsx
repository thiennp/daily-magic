"use client";

import AppPanel from "@/components/surfaces/AppPanel";
import WorkflowRunStepProgress from "@/features/dispatch/WorkflowRunStepProgress";
import WorkflowRunStepTimeline from "@/features/dispatch/WorkflowRunStepTimeline";
import type { WorkflowStepRunRecord } from "@/lib/workflowOrchestration/types/WorkflowRunRecord.type";

const DEMO_STEPS: readonly WorkflowStepRunRecord[] = [
  {
    id: "demo-step-0",
    workflowRunId: "demo-run",
    nodeId: "node-0",
    nodeKind: "agent",
    stepIndex: 0,
    status: "completed",
    title: "Gather context from repo",
    agentRunId: null,
    output: null,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:05:00.000Z",
    completedAt: "2026-01-01T00:05:00.000Z",
  },
  {
    id: "demo-step-1",
    workflowRunId: "demo-run",
    nodeId: "node-1",
    nodeKind: "human",
    stepIndex: 1,
    status: "waiting_human",
    title: "Approve deploy",
    agentRunId: null,
    output: null,
    createdAt: "2026-01-01T00:05:00.000Z",
    updatedAt: "2026-01-01T00:05:00.000Z",
    completedAt: null,
  },
  {
    id: "demo-step-2",
    workflowRunId: "demo-run",
    nodeId: "node-2",
    nodeKind: "agent",
    stepIndex: 2,
    status: "pending",
    title: "Ship change",
    agentRunId: null,
    output: null,
    createdAt: "2026-01-01T00:05:00.000Z",
    updatedAt: "2026-01-01T00:05:00.000Z",
    completedAt: null,
  },
];

export default function WorkflowProgressSection() {
  return (
    <section id="workflow-progress" className="scroll-mt-28">
      <h2 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
        Workflow progress
      </h2>
      <p className="mb-5 max-w-2xl text-sm text-gray-600 dark:text-gray-400">
        When a workflow or agent run is in flight, operators see which steps
        finished, which one needs them, and what is still ahead — same visual
        language as the live agent progress feed.
      </p>
      <AppPanel padding="default">
        <p className="text-sm font-medium text-brand-600 dark:text-brand-400">
          Release checklist (example)
        </p>
        <h3 className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
          Approve deploy
        </h3>
        <WorkflowRunStepProgress stepIndex={1} totalSteps={3} />
        <WorkflowRunStepTimeline
          steps={DEMO_STEPS}
          highlightStepIndex={1}
          isWorking={false}
        />
      </AppPanel>
    </section>
  );
}
