import { runNavConsolidationPageRedirect } from "@/lib/shell/runNavConsolidationPageRedirect";

export const dynamic = "force-dynamic";

interface LibraryPageProps {
  readonly searchParams: Promise<
    Record<string, string | string[] | undefined>
  >;
}

/**
 * Retired top-level Library (incl. create UI) → project Library picker.
 * Create forms are not reachable here anymore — creates belong in a project.
 */
export default async function LibraryPage({ searchParams }: LibraryPageProps) {
  await runNavConsolidationPageRedirect({
    intent: "library",
    searchParams,
  });
}
