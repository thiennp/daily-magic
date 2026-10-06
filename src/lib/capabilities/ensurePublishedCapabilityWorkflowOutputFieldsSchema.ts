import { getSql } from "@/lib/db";

const schemaEnsureState: {
  ensured: boolean;
  promise: Promise<void> | null;
} = {
  ensured: false,
  promise: null,
};

/**
 * Production Neon has repeatedly drifted behind capability INSERT columns
 * (see #125 for workflow_output_fields / 014-workflow-field-uploads).
 * `createPublishedCapability` also writes `operator_steps` (014-operator-steps).
 * Ensure both jsonb columns before any capability write so onboarding bootstrap
 * seeding and library creates cannot 500 on a missing column.
 */
export const ensurePublishedCapabilityWorkflowOutputFieldsSchema =
  async (): Promise<void> => {
    if (schemaEnsureState.ensured) {
      return;
    }

    if (schemaEnsureState.promise !== null) {
      return schemaEnsureState.promise;
    }

    schemaEnsureState.promise = (async () => {
      const sql = getSql();
      await sql`
        ALTER TABLE published_capabilities
        ADD COLUMN IF NOT EXISTS workflow_output_fields JSONB NOT NULL DEFAULT '[]'::jsonb
      `;
      await sql`
        ALTER TABLE published_capabilities
        ADD COLUMN IF NOT EXISTS operator_steps JSONB NOT NULL DEFAULT '[]'::jsonb
      `;
      schemaEnsureState.ensured = true;
    })();

    return schemaEnsureState.promise;
  };

export const resetPublishedCapabilityWorkflowOutputFieldsSchemaEnsureForTests =
  (): void => {
    schemaEnsureState.ensured = false;
    schemaEnsureState.promise = null;
  };
