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

const MAX_RESULTS = 20;

export const POST = async (request: Request): Promise<NextResponse> => {
  // The internal docs index is for the team: a deployed app asks for a signed-in user.
  if (process.env.NODE_ENV === "production") {
    const { requireAuth } = await import("@/lib/auth/requireAuth");
    const { actor, error } = await requireAuth();
    if (error || !actor) {
      return error as NextResponse;
    }
  }

  const body = (await request.json().catch(() => null)) as QueryBody | null;

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

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
    limit: Math.min(
      Math.max(1, Math.floor(Number(body.limit) || 5)),
      MAX_RESULTS,
    ),
  });

  return NextResponse.json(result);
};
