import { getHarnessCatalogSnapshot } from "@/lib/harness/harnessCatalogMutations";
import {
  listHarnessSetSharing,
  upsertHarnessSetSharing,
} from "@/lib/harness/harnessSetSharingQueries";
import { DEFAULT_HARNESS_SHARING_VISIBILITY } from "@/lib/harness/HarnessSharingVisibility.constant";
import { parseHarnessSetSharingBody } from "@/lib/harness/parseHarnessSetSharingBody";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

const extractSetSummaries = (
  manifestJson: Readonly<Record<string, unknown>>,
): readonly { readonly slug: string; readonly name: string }[] => {
  const sets =
    typeof manifestJson.sets === "object" &&
    manifestJson.sets !== null &&
    !Array.isArray(manifestJson.sets)
      ? (manifestJson.sets as Record<string, { readonly name?: string }>)
      : {};

  return Object.entries(sets).map(([slug, set]) => ({
    slug,
    name: typeof set.name === "string" ? set.name : slug,
  }));
};

export async function GET(): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const [overrides, snapshot] = await Promise.all([
    listHarnessSetSharing(actor.id),
    getHarnessCatalogSnapshot(actor.id),
  ]);

  const sets =
    snapshot === null ? [] : extractSetSummaries(snapshot.manifestJson);
  const overrideBySlug = new Map(
    overrides.map((entry) => [entry.setSlug, entry.visibility]),
  );

  return Response.json({
    ok: true,
    defaultVisibility: DEFAULT_HARNESS_SHARING_VISIBILITY,
    sets: sets.map((set) => ({
      slug: set.slug,
      name: set.name,
      visibility:
        overrideBySlug.get(set.slug) ?? DEFAULT_HARNESS_SHARING_VISIBILITY,
    })),
  });
}

export async function PATCH(request: Request): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const body: unknown = await request.json();
  const parsed = parseHarnessSetSharingBody(body);

  if (parsed === null) {
    return Response.json(
      { error: "Invalid set sharing payload." },
      { status: 400 },
    );
  }

  await upsertHarnessSetSharing({
    ownerUserId: actor.id,
    setSlug: parsed.setSlug,
    visibility: parsed.visibility,
  });

  return Response.json({ ok: true, ...parsed });
}
