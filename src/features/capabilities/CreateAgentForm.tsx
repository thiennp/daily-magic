"use client";

import Button from "@/components/ui/button/Button";
import CapabilityHarnessItemsEditor from "@/features/capabilities/CapabilityHarnessItemsEditor";
import PlaybookBasicsFields from "@/features/capabilities/PlaybookBasicsFields";
import { type CreatePlaybookResult } from "@/features/capabilities/submitCreatePlaybook";
import { useCreateAgentForm } from "@/features/capabilities/hooks/useCreateAgentForm";
import type CreateGuestPlaybookPayload from "@/lib/library/guest/types/CreateGuestPlaybookPayload.type";

interface CreateAgentFormProps {
  readonly onCreated: () => void;
  readonly onCancel: () => void;
  readonly submitPlaybook?: (
    payload: CreateGuestPlaybookPayload,
  ) => Promise<CreatePlaybookResult>;
  readonly submitLabel?: string;
}

export default function CreateAgentForm({
  onCreated,
  onCancel,
  submitPlaybook,
  submitLabel = "Publish agent",
}: CreateAgentFormProps) {
  const form = useCreateAgentForm({ onCreated, onCancel, submitPlaybook });

  return (
    <div className="mt-6 space-y-4">
      <PlaybookBasicsFields
        playbookType="agent"
        name={form.name}
        description={form.description}
        exampleRequest={form.exampleRequest}
        onNameChange={form.setName}
        onDescriptionChange={form.setDescription}
        onExampleRequestChange={form.setExampleRequest}
      />
      <CapabilityHarnessItemsEditor
        items={form.harness.items}
        onAdd={form.harness.addItem}
        onRemove={form.harness.removeItem}
        onChange={form.harness.updateItem}
      />
      {form.error ? (
        <p className="text-sm text-error-600 dark:text-error-400">
          {form.error}
        </p>
      ) : null}
      {form.notice ? (
        <p className="text-sm text-amber-700 dark:text-amber-300">
          {form.notice}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <Button
          disabled={form.isSubmitting}
          onClick={() => void form.handleSubmit()}
        >
          {form.isSubmitting ? "Saving…" : submitLabel}
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
