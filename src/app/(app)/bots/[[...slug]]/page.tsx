import { runNavConsolidationPageRedirect } from "@/lib/shell/runNavConsolidationPageRedirect";

export const dynamic = "force-dynamic";

interface BotsPageProps {
  readonly searchParams: Promise<
    Record<string, string | string[] | undefined>
  >;
}

/** /bots and /bots/* → project Team consolidation redirect. */
export default async function BotsPage({ searchParams }: BotsPageProps) {
  await runNavConsolidationPageRedirect({
    intent: "bots",
    searchParams,
  });
}
