import { runNavConsolidationPageRedirect } from "@/lib/shell/runNavConsolidationPageRedirect";

export const dynamic = "force-dynamic";

interface MyBotsPageProps {
  readonly searchParams: Promise<
    Record<string, string | string[] | undefined>
  >;
}

/** Retired /my-bots → /projects?intent=bots (or project #team). */
export default async function MyBotsPage({ searchParams }: MyBotsPageProps) {
  await runNavConsolidationPageRedirect({
    intent: "bots",
    searchParams,
  });
}
