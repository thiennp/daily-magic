"use client";

import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import type { CapabilityTypeValue } from "@/lib/capabilities/CapabilityType.constant";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

const TYPE_LABEL_MAP: Record<CapabilityTypeValue, string> = {
  [CapabilityType.AGENT]: "Agent",
  [CapabilityType.WORKFLOW]: "Workflow",
};

interface MarketplaceListingPreviewProps {
  readonly type: CapabilityTypeValue;
  readonly name: string;
  readonly description: string;
  readonly exampleRequest: string;
  readonly workflowFields: readonly WorkflowFieldDefinition[];
  readonly ownerEmail: string;
  readonly ownerName: string | null;
  readonly hostname: string;
  readonly harnessSetSlug: string;
  readonly harnessSetName: string | null;
  readonly harnessItemPaths: readonly string[];
}

export default function MarketplaceListingPreview({
  type,
  name,
  description,
  exampleRequest,
  workflowFields,
  ownerEmail,
  ownerName,
  hostname,
  harnessSetSlug,
  harnessSetName,
  harnessItemPaths,
}: MarketplaceListingPreviewProps) {
  return (
    <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50/40 p-4 dark:border-brand-900/40 dark:bg-brand-950/20">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-brand-700 dark:bg-gray-800 dark:text-brand-300">
          {TYPE_LABEL_MAP[type]}
        </span>
        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
          {name}
        </p>
      </div>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {description}
      </p>
      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        Shared by {ownerName ?? ownerEmail} ({hostname})
      </p>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        Bundle: {harnessSetName ?? harnessSetSlug}
      </p>
      {exampleRequest ? (
        <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
          <span className="font-medium">Example request:</span> {exampleRequest}
        </p>
      ) : null}
      {workflowFields.length > 0 ? (
        <div className="mt-3">
          <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
            Workflow fields
          </p>
          <ul className="mt-1 space-y-1 text-xs text-gray-600 dark:text-gray-400">
            {workflowFields.map((field) => (
              <li key={field.key}>
                {field.label}
                {field.required ? " (required)" : ""}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {harnessItemPaths.length > 0 ? (
        <div className="mt-3">
          <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
            Included items
          </p>
          <ul className="mt-1 max-h-40 space-y-1 overflow-auto text-xs text-gray-600 dark:text-gray-400">
            {harnessItemPaths.map((path) => (
              <li key={path}>{path}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
