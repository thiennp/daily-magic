import { getSql } from "@/lib/db";

type NoteRow = {
  readonly id: number;
  readonly title: string;
  readonly body: string | null;
  readonly created_at: string;
};

function isNoteRow(value: unknown): value is NoteRow {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "title" in value &&
    "created_at" in value
  );
}

export async function GET() {
  try {
    const sql = getSql();
    const rows = await sql`
      SELECT id, title, body, created_at
      FROM notes
      ORDER BY created_at DESC
      LIMIT 20
    `;

    const notes = Array.isArray(rows) ? rows.filter(isNoteRow) : [];

    return Response.json({ notes });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load notes";

    return Response.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      title?: string;
      body?: string;
    };

    if (!body.title?.trim()) {
      return Response.json({ error: "title is required" }, { status: 400 });
    }

    const sql = getSql();
    const rows = await sql`
      INSERT INTO notes (title, body)
      VALUES (${body.title.trim()}, ${body.body?.trim() ?? null})
      RETURNING id, title, body, created_at
    `;

    const note = Array.isArray(rows) ? rows.find(isNoteRow) : undefined;

    return Response.json({ note: note ?? null }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create note";

    return Response.json({ error: message }, { status: 500 });
  }
}
