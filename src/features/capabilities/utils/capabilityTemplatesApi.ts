import { markOnboardingWorkflowCreated } from "@/features/home/utils/public-api/presentation";
import type {
  CapabilityTemplateDetail,
  CapabilityTemplateSummary,
} from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

interface SaveCapabilityTemplateResult {
  readonly ok: boolean;
  readonly errorMessage: string | null;
  readonly harnessInstalled: boolean;
  readonly harnessInstallMessage: string | null;
}

export const fetchCapabilityTemplates = async (): Promise<
  readonly CapabilityTemplateSummary[]
> => {
  const response = await fetch("/api/capabilities/templates");
  const payload: unknown = await response.json();

  if (
    !response.ok ||
    typeof payload !== "object" ||
    payload === null ||
    !Array.isArray((payload as { templates?: unknown }).templates)
  ) {
    return [];
  }

  return (payload as { templates: CapabilityTemplateSummary[] }).templates;
};

export const fetchCapabilityTemplateDetail = async (
  templateId: string,
): Promise<CapabilityTemplateDetail | null> => {
  const response = await fetch(`/api/capabilities/templates/${templateId}`);
  const payload: unknown = await response.json();

  if (
    !response.ok ||
    typeof payload !== "object" ||
    payload === null ||
    typeof (payload as { template?: unknown }).template !== "object" ||
    (payload as { template: unknown }).template === null
  ) {
    return null;
  }

  return (payload as { template: CapabilityTemplateDetail }).template;
};

export const SAVE_TO_PROJECT_REQUIRED_MESSAGE = "Choose a project to save to.";

export const saveCapabilityTemplateToLibrary = async (
  templateId: string,
  projectId: string,
): Promise<SaveCapabilityTemplateResult> => {
  const trimmedProjectId = projectId.trim();

  if (trimmedProjectId.length === 0) {
    return {
      ok: false,
      errorMessage: SAVE_TO_PROJECT_REQUIRED_MESSAGE,
      harnessInstalled: false,
      harnessInstallMessage: null,
    };
  }

  const response = await fetch("/api/capabilities/templates/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ templateId, project_id: trimmedProjectId }),
  });
  const payload: unknown = await response.json();

  if (!response.ok) {
    const errorMessage =
      typeof payload === "object" &&
      payload !== null &&
      typeof (payload as { error?: unknown }).error === "string"
        ? (payload as { error: string }).error
        : "Could not save this template.";

    return {
      ok: false,
      errorMessage,
      harnessInstalled: false,
      harnessInstallMessage: null,
    };
  }

  const record = payload as {
    harnessInstalled?: boolean;
    harnessInstallMessage?: string | null;
  };

  markOnboardingWorkflowCreated();

  return {
    ok: true,
    errorMessage: null,
    harnessInstalled: record.harnessInstalled === true,
    harnessInstallMessage:
      typeof record.harnessInstallMessage === "string"
        ? record.harnessInstallMessage
        : null,
  };
};
