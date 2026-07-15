"use client";

import Label from "@/components/form/Label";
import TextArea from "@/components/form/input/TextArea";
import {
  AGENT_BUILDER_ABOUT_SECTION,
  AGENT_BUILDER_INSTRUCTIONS_LABEL,
  AGENT_BUILDER_INSTRUCTIONS_PLACEHOLDER,
} from "@/features/capabilities/playbookBuilderCopy.constant";
import {
  WORKFLOW_BUILDER_ABOUT_SECTION,
  WORKFLOW_BUILDER_INSTRUCTIONS_LABEL,
  WORKFLOW_BUILDER_INSTRUCTIONS_PLACEHOLDER,
} from "@/features/workflows/workflowBuilderCopy.constant";

type PlaybookType = "workflow" | "agent";

interface PlaybookBasicsFieldsProps {
  readonly playbookType: PlaybookType;
  readonly name: string;
  readonly description: string;
  readonly exampleRequest: string;
  readonly onNameChange: (value: string) => void;
  readonly onDescriptionChange: (value: string) => void;
  readonly onExampleRequestChange: (value: string) => void;
}

const inputClass =
  "h-11 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-800";

const COPY_BY_TYPE = {
  workflow: {
    about: WORKFLOW_BUILDER_ABOUT_SECTION,
    nameLabel: "Workflow name",
    namePlaceholder: "Weekly client report",
    nameId: "workflow-name",
    descriptionId: "workflow-description",
    instructionsId: "workflow-instructions",
    instructionsLabel: WORKFLOW_BUILDER_INSTRUCTIONS_LABEL,
    instructionsPlaceholder: WORKFLOW_BUILDER_INSTRUCTIONS_PLACEHOLDER,
    instructionsOptional: true,
  },
  agent: {
    about: AGENT_BUILDER_ABOUT_SECTION,
    nameLabel: "Agent name",
    namePlaceholder: "PR security reviewer",
    nameId: "agent-name",
    descriptionId: "agent-description",
    instructionsId: "agent-instructions",
    instructionsLabel: AGENT_BUILDER_INSTRUCTIONS_LABEL,
    instructionsPlaceholder: AGENT_BUILDER_INSTRUCTIONS_PLACEHOLDER,
    instructionsOptional: false,
  },
} as const;

export default function PlaybookBasicsFields({
  playbookType,
  name,
  description,
  exampleRequest,
  onNameChange,
  onDescriptionChange,
  onExampleRequestChange,
}: PlaybookBasicsFieldsProps) {
  const copy = COPY_BY_TYPE[playbookType];

  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white/90">
          {copy.about.title}
        </h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {copy.about.description}
        </p>
      </div>
      <div>
        <Label htmlFor={copy.nameId}>{copy.nameLabel}</Label>
        <input
          id={copy.nameId}
          value={name}
          placeholder={copy.namePlaceholder}
          onChange={(event) => {
            onNameChange(event.target.value);
          }}
          className={inputClass}
        />
      </div>
      <div>
        <Label htmlFor={copy.descriptionId}>Description (optional)</Label>
        <TextArea
          placeholder="What this is for — shown in Library only"
          rows={2}
          value={description}
          onChange={onDescriptionChange}
        />
      </div>
      <div>
        <Label htmlFor={copy.instructionsId}>
          {copy.instructionsLabel}
          {copy.instructionsOptional ? " (optional)" : null}
        </Label>
        <TextArea
          placeholder={copy.instructionsPlaceholder}
          rows={3}
          value={exampleRequest}
          onChange={onExampleRequestChange}
        />
      </div>
    </section>
  );
}
