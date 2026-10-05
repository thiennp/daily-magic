import { authorizeProjectPageActor } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";
import {
  buildIntentProjectTabRedirectPath,
  buildProjectsIntentRedirectPath,
  readNavConsolidationProjectId,
} from "@/lib/shell/buildNavConsolidationRedirect";
import type { NavConsolidationIntent } from "@/lib/shell/navConsolidationIntent.constant";

/**
 * Resolve where a retired top-level nav route should 308.
 * With ?project= and an openable project → that project's tab hash.
 * Otherwise → /projects?intent=… (keeps other query). Never throws for missing access.
 */
export const resolveNavConsolidationRedirectPath = async (input: {
  readonly intent: NavConsolidationIntent;
  readonly searchParams: Readonly<
    Record<string, string | string[] | undefined>
  >;
  readonly actorUserId: string | null;
  readonly hashQuery?: Readonly<Record<string, string>>;
}): Promise<string> => {
  const projectId = readNavConsolidationProjectId(input.searchParams);
  const listPath = buildProjectsIntentRedirectPath(
    input.intent,
    input.searchParams,
  );

  if (projectId === null || input.actorUserId === null) {
    return listPath;
  }

  try {
    const access = await authorizeProjectPageActor({
      projectId,
      actorUserId: input.actorUserId,
    });
    if (!access.ok) {
      return listPath;
    }
    return buildIntentProjectTabRedirectPath(
      projectId,
      input.intent,
      input.hashQuery ?? {},
    );
  } catch {
    return listPath;
  }
};
