import type { AuthorableWorkflowFieldInputType } from "@/lib/workflows/types/WorkflowFieldInputType.constant";
import { WorkflowFieldInputType } from "@/lib/workflows/types/WorkflowFieldInputType.constant";

export const WORKFLOW_BUILDER_INPUT_TYPE_OPTIONS: readonly {
  readonly value: AuthorableWorkflowFieldInputType;
  readonly label: string;
}[] = [
  { value: WorkflowFieldInputType.TEXT, label: "Text" },
  { value: WorkflowFieldInputType.TEXTAREA, label: "Paragraph" },
  { value: WorkflowFieldInputType.NUMBER, label: "Number" },
  { value: WorkflowFieldInputType.PHONE, label: "Phone" },
  { value: WorkflowFieldInputType.EMAIL, label: "Email" },
  { value: WorkflowFieldInputType.URL, label: "Link" },
  { value: WorkflowFieldInputType.DATE, label: "Date" },
  { value: WorkflowFieldInputType.BOOLEAN, label: "Yes / no" },
  { value: WorkflowFieldInputType.SELECT, label: "Choice list" },
  { value: WorkflowFieldInputType.FILE, label: "File (PDF or image)" },
];
