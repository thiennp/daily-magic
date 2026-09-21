import { getSql } from "@/lib/db";

const schemaEnsureState: {
  ensured: boolean;
  promise: Promise<void> | null;
} = {
  ensured: false,
  promise: null,
};

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
      schemaEnsureState.ensured = true;
    })();

    return schemaEnsureState.promise;
  };

export const resetPublishedCapabilityWorkflowOutputFieldsSchemaEnsureForTests =
  (): void => {
    schemaEnsureState.ensured = false;
    schemaEnsureState.promise = null;
  };
