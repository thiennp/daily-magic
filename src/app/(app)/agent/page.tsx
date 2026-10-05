import { redirect } from "next/navigation";

import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";
import { buildNavConsolidationNewTaskHref } from "@/lib/shell/buildNavConsolidationNewTaskHref";

interface AgentPageSearchParams {
  readonly libraryCapabilityId?: string | string[];
  readonly prompt?: string | string[];
  readonly deviceId?: string | string[];
  readonly projectId?: string | string[];
  readonly project?: string | string[];
  readonly customTask?: string | string[];
  readonly sendTask?: string | string[];
}

const readSearchParam = (
  value: string | string[] | undefined,
): string | undefined => (typeof value === "string" ? value : undefined);

export default async function AgentPage({
  searchParams,
}: {
  readonly searchParams: Promise<AgentPageSearchParams>;
}) {
  const params = await searchParams;
  const libraryCapabilityId = readSearchParam(params.libraryCapabilityId);
  const prompt = readSearchParam(params.prompt);
  const deviceId = readSearchParam(params.deviceId);
  const projectId =
    readSearchParam(params.projectId) ?? readSearchParam(params.project);

  // Legacy Mac / library composer deep links keep the send-task modal.
  if (
    libraryCapabilityId !== undefined ||
    prompt !== undefined ||
    deviceId !== undefined
  ) {
    redirect(
      buildAgentComposerHref({
        libraryCapabilityId,
        prompt,
        deviceId,
        projectId,
      }),
    );
  }

  redirect(buildNavConsolidationNewTaskHref({ projectId }));
}
