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
    // The driver's message can carry host and user names: keep it in the server log only.
    console.error("db health check failed", error);

    return Response.json(
      {
        connected: false,
        error: "Database connection failed",
      },
      { status: 500 },
    );
  }
}
