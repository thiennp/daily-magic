import { NextResponse } from "next/server";

import {
  loadFeatureKnowledgeIndex,
  searchFeatureKnowledge,
} from "@/lib/featureKnowledge/searchFeatureKnowledge";

interface QueryBody {
  readonly query?: string;
  readonly featureSlug?: string;
  readonly limit?: number;
}

export const POST = async (request: Request): Promise<NextResponse> => {
  const body = (await request.json()) as QueryBody;
  const query = body.query?.trim();

  if (!query) {
    return NextResponse.json({ error: "query is required" }, { status: 400 });
  }

  const repoRoot = process.cwd();
  const index = loadFeatureKnowledgeIndex(repoRoot);

  if (!index) {
    return NextResponse.json(
      {
        error:
          "Feature knowledge index missing. Run `npm run feature-knowledge:index`.",
      },
      { status: 503 },
    );
  }

  const result = searchFeatureKnowledge(index, query, {
    featureSlug: body.featureSlug,
    limit: body.limit,
  });

  return NextResponse.json(result);
};
