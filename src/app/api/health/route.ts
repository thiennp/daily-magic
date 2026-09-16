import { readAgentWitchServerRelease } from "@/lib/release/readAgentWitchServerRelease";
import { readDeviceSupersessionMigrationApplied } from "@/lib/release/readDeviceSupersessionMigrationApplied";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const release = readAgentWitchServerRelease();
  const deviceSupersessionMigrationApplied =
    await readDeviceSupersessionMigrationApplied().catch(() => false);

  return Response.json({
    ok: true,
    release,
    deviceSupersessionMigrationApplied,
  });
}
