import { runNavConsolidationPageRedirect } from "@/lib/shell/runNavConsolidationPageRedirect";

export const dynamic = "force-dynamic";

interface NewTaskPageProps {
  readonly searchParams: Promise<
    Record<string, string | string[] | undefined>
  >;
}

/** Retired top-level New task → project picker (or the project Chat dock, `#chat?mode=task`). */
export default async function NewTaskPage({ searchParams }: NewTaskPageProps) {
  await runNavConsolidationPageRedirect({
    intent: "new-task",
    searchParams,
  });
}
