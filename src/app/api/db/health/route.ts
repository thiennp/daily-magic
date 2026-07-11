import { getSql } from "@/lib/db";

export async function GET() {
  try {
    const sql = getSql();
    const rows = await sql`SELECT NOW() AS connected_at`;
    const connectedAt =
      Array.isArray(rows) && rows[0] && "connected_at" in rows[0]
        ? String(rows[0].connected_at)
        : null;

    return Response.json({
      connected: true,
      connectedAt,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Database connection failed";

    return Response.json(
      {
        connected: false,
        error: message,
      },
      { status: 500 },
    );
  }
}
