import { describe, expect, it } from "vitest";

import { GET as rootGet } from "@/app/.well-known/oauth-protected-resource/route";
import { GET as mcpGet } from "@/app/.well-known/oauth-protected-resource/api/agent-access/mcp/route";
import { GET as connectGet } from "@/app/.well-known/oauth-protected-resource/api/agent-access/mcp/connect/route";

describe("path-scoped oauth-protected-resource", () => {
  it("serves the same metadata as the root document", async () => {
    const root: unknown = await (await rootGet()).json();
    expect(await (await mcpGet()).json()).toEqual(root);
    expect(await (await connectGet()).json()).toEqual(root);
  });
});
