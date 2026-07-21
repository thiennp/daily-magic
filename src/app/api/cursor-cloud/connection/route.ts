import { requireAuth } from "@/lib/auth/requireAuth";
import {
  deleteCursorCloudConnection,
  getCursorCloudConnectionSummary,
  upsertCursorCloudConnection,
} from "@/lib/cursorCloud/cursorCloudConnectionQueries";
import { fetchCursorCloudApiKeyInfo } from "@/lib/cursorCloud/fetchCursorCloudApiKeyInfo";

export const dynamic = "force-dynamic";

const resolveAuthSecret = (): string | null => {
  const authSecret = process.env.AUTH_SECRET;
  return typeof authSecret === "string" && authSecret.length > 0
    ? authSecret
    : null;
};

export async function GET(): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }

  const summary = await getCursorCloudConnectionSummary(actor.id);
  return Response.json(summary);
}

export async function DELETE(): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }

  await deleteCursorCloudConnection(actor.id);
  return Response.json({ ok: true });
}

export async function POST(request: Request): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) {
    return error;
  }

  const authSecret = resolveAuthSecret();
  if (authSecret === null) {
    return Response.json(
      { error: "Server auth is not configured." },
      { status: 500 },
    );
  }

  const body: unknown = await request.json().catch(() => null);
  const apiKey =
    typeof body === "object" &&
    body !== null &&
    "apiKey" in body &&
    typeof (body as { apiKey: unknown }).apiKey === "string"
      ? (body as { apiKey: string }).apiKey.trim()
      : "";

  if (apiKey.length === 0) {
    return Response.json({ error: "apiKey is required." }, { status: 400 });
  }

  const keyInfo = await fetchCursorCloudApiKeyInfo(apiKey);
  if (keyInfo === null) {
    return Response.json(
      { error: "Cursor rejected that API key." },
      { status: 400 },
    );
  }

  await upsertCursorCloudConnection({
    userId: actor.id,
    apiKey,
    authSecret,
    apiKeyName: keyInfo.apiKeyName,
    cursorUserEmail: keyInfo.cursorUserEmail,
  });

  const summary = await getCursorCloudConnectionSummary(actor.id);
  return Response.json(summary);
}
