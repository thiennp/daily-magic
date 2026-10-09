import {
  parseAccountName,
  sanitizeAccountPrefs,
} from "@/lib/account/accountPrefs";
import {
  loadAccountPrefs,
  saveAccountName,
  saveAccountPrefs,
} from "@/lib/account/accountPrefsDb";
import { requireAuth } from "@/lib/auth/requireAuth";

export const dynamic = "force-dynamic";

/** Own account: display name plus saved Account page preferences. */
export async function GET(): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const { name, prefs } = await loadAccountPrefs(actor.id);
  return Response.json({ ok: true, name, prefs });
}

/** `{name?, prefs?}`: only the given parts change; prefs are sanitised. */
export async function PATCH(request: Request): Promise<Response> {
  const { actor, error } = await requireAuth();
  if (error || !actor) return error;
  const body = (await request.json().catch(() => null)) as {
    name?: unknown;
    prefs?: unknown;
  } | null;
  if (body === null || typeof body !== "object") {
    return Response.json(
      { ok: false, errorMessage: "invalid_arguments" },
      { status: 400 },
    );
  }
  if (body.name !== undefined) {
    const name = parseAccountName(body.name);
    if (name === null) {
      return Response.json(
        { ok: false, errorMessage: "Enter at least 2 letters." },
        { status: 422 },
      );
    }
    await saveAccountName(actor.id, name);
  }
  if (body.prefs !== undefined) {
    await saveAccountPrefs(actor.id, sanitizeAccountPrefs(body.prefs));
  }
  return Response.json({ ok: true });
}
