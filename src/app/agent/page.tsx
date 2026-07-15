import { redirect } from "next/navigation";

import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";

interface AgentPageSearchParams {
  readonly libraryCapabilityId?: string | string[];
  readonly prompt?: string | string[];
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

  redirect(
    buildAgentComposerHref({
      libraryCapabilityId: readSearchParam(params.libraryCapabilityId),
      prompt: readSearchParam(params.prompt),
    }),
  );
}
