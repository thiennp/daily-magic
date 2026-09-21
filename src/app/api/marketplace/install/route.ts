import installMarketplaceListing from "@/lib/marketplace/installMarketplaceListing";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

const parseInstallBody = (
  body: unknown,
): { readonly capabilityId: string; readonly deviceId: string } | null => {
  if (typeof body !== "object" || body === null) {
    return null;
  }

  const capabilityId = (body as { capabilityId?: unknown }).capabilityId;
  const deviceId = (body as { deviceId?: unknown }).deviceId;

  if (
    typeof capabilityId !== "string" ||
    capabilityId.trim().length === 0 ||
    typeof deviceId !== "string" ||
    deviceId.trim().length === 0
  ) {
    return null;
  }

  return {
    capabilityId: capabilityId.trim(),
    deviceId: deviceId.trim(),
  };
};

export async function POST(request: Request): Promise<Response> {
  const { actor, error } = await requireAuth();

  if (error || !actor) {
    return error;
  }

  const bodyResult = await request
    .json()
    .then((value: unknown) => ({ ok: true as const, value }))
    .catch(() => ({ ok: false as const }));

  if (!bodyResult.ok) {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = parseInstallBody(bodyResult.value);

  if (parsed === null) {
    return Response.json(
      { error: "capabilityId and deviceId are required." },
      { status: 400 },
    );
  }

  try {
    const result = await installMarketplaceListing({
      actorUserId: actor.id,
      capabilityId: parsed.capabilityId,
      deviceId: parsed.deviceId,
    });

    if (!result.ok) {
      return Response.json(
        { error: result.errorMessage ?? "Install failed." },
        { status: 409 },
      );
    }

    return Response.json({
      ok: true,
      savedToLibrary: result.savedToLibrary,
      libraryCapabilityId: result.libraryCapabilityId,
      harnessInstalled: result.harnessInstalled,
      harnessInstallMessage: result.harnessInstallMessage,
      localHarnessBundle: result.localHarnessBundle,
    });
  } catch (installError) {
    console.error("[marketplace/install] unhandled error", installError);
    return Response.json(
      { error: "Install failed. Try again in a moment." },
      { status: 500 },
    );
  }
}
