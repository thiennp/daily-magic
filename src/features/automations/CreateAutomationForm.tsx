"use client";

import Link from "next/link";

import AppPanel from "@/components/surfaces/AppPanel";
import Button from "@/components/ui/button/Button";
import CreateAutomationBaseFields from "@/features/automations/CreateAutomationBaseFields";
import CreateAutomationWebhookReveal from "@/features/automations/CreateAutomationWebhookReveal";
import { AUTOMATIONS_PAGE_COPY } from "@/features/automations/automationsPageCopy.constant";
import { useCreateAutomationForm } from "@/features/automations/hooks/useCreateAutomationForm";
import WorkflowTaskFields from "@/features/workflows/WorkflowTaskFields";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";

interface CreateAutomationFormProps {
  readonly capabilities: readonly PublishedCapabilityRecord[];
  readonly initialCapabilityId?: string;
  readonly onCreated: () => void;
}

export default function CreateAutomationForm({
  capabilities,
  initialCapabilityId,
  onCreated,
}: CreateAutomationFormProps) {
  const form = useCreateAutomationForm(
    capabilities,
    initialCapabilityId,
    onCreated,
  );

  return (
    <AppPanel as="section" padding="compact">
      <h2 className="text-base font-semibold text-gray-800 dark:text-white/90">
        {AUTOMATIONS_PAGE_COPY.createTitle}
      </h2>
      <div className="mt-4 space-y-4">
        <CreateAutomationBaseFields
          capabilities={capabilities}
          capabilityId={form.capabilityId}
          name={form.name}
          triggerType={form.triggerType}
          preset={form.preset}
          scheduleHour={form.scheduleHour}
          scheduleTimezone={form.scheduleTimezone}
          onCapabilityChange={form.handleCapabilityChange}
          onNameChange={form.setName}
          onTriggerTypeChange={form.setTriggerType}
          onPresetChange={form.setPreset}
          onScheduleHourChange={form.setScheduleHour}
          onScheduleTimezoneChange={form.setScheduleTimezone}
        />
        {form.capability !== null ? (
          <WorkflowTaskFields
            fields={form.capability.workflowFields}
            values={form.fieldValues}
            onChange={(key, value) => {
              form.setFieldValues((current) => ({ ...current, [key]: value }));
            }}
          />
        ) : null}
        {form.webhookSecret !== null ? (
          <CreateAutomationWebhookReveal
            webhookSecret={form.webhookSecret}
            webhookUrl={form.webhookUrl}
          />
        ) : null}
        {form.error ? (
          <p className="text-sm text-error-600 dark:text-error-400">
            {form.error}
          </p>
        ) : null}
        <div className="flex flex-wrap gap-2">
          <Button
            disabled={form.isSubmitting}
            onClick={() => {
              void form.handleSubmit();
            }}
          >
            {form.isSubmitting ? "Saving…" : "Create automation"}
          </Button>
          <Link href="/library">
            <Button variant="outline">Back to library</Button>
          </Link>
        </div>
      </div>
    </AppPanel>
  );
}
