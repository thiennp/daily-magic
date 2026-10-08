import { linearGraphql } from "@/lib/projects/taskSync/linearGraphql";

/** Issues fetched per Linear request, and requests per "Sync now" pull. */
export const LINEAR_PULL_PAGE_SIZE = 100;
export const LINEAR_PULL_MAX_PAGES = 3;

type IssueNode = Readonly<Record<string, unknown>> & {
  readonly labels?: { readonly nodes?: readonly unknown[] };
};

type IssuesPage = {
  readonly issues: {
    readonly nodes: readonly IssueNode[];
    readonly pageInfo: {
      readonly hasNextPage: boolean;
      readonly endCursor: string | null;
    };
  };
};

const QUERY = `query($filter: IssueFilter, $first: Int!, $after: String) {
  issues(filter: $filter, first: $first, after: $after, orderBy: updatedAt) {
    nodes { id identifier url title description priority archivedAt
      team { id } state { type } labels { nodes { name } } }
    pageInfo { hasNextPage endCursor }
  } }`;

/** GraphQL issue node -> the webhook `data` shape parseLinearWebhook reads. */
export const issueNodeToWebhookPayload = (node: IssueNode): unknown => ({
  type: "Issue",
  action: "update",
  data: { ...node, labels: node.labels?.nodes },
});

export type LinearIssuePullResult = {
  readonly payloads: readonly unknown[];
  /** False when more pages remain than LINEAR_PULL_MAX_PAGES allows. */
  readonly complete: boolean;
};

/** Team issues updated after `since` (null = all), newest first, page-capped. */
export const listLinearIssuesUpdatedSince = async (input: {
  readonly token: string;
  readonly teamId: string;
  readonly since: string | null;
}): Promise<LinearIssuePullResult> => {
  const filter = {
    team: { id: { eq: input.teamId } },
    ...(input.since !== null ? { updatedAt: { gt: input.since } } : {}),
  };
  const fetchPage = async (
    page: number,
    after: string | null,
    acc: readonly unknown[],
  ): Promise<LinearIssuePullResult> => {
    const data = await linearGraphql<IssuesPage>(input.token, QUERY, {
      filter,
      first: LINEAR_PULL_PAGE_SIZE,
      after,
    });
    const payloads = [
      ...acc,
      ...data.issues.nodes.map(issueNodeToWebhookPayload),
    ];
    const { hasNextPage, endCursor } = data.issues.pageInfo;
    if (!hasNextPage) return { payloads, complete: true };
    if (page >= LINEAR_PULL_MAX_PAGES || endCursor === null) {
      return { payloads, complete: false };
    }
    return fetchPage(page + 1, endCursor, payloads);
  };
  return fetchPage(1, null, []);
};
