import { describe, expect, it } from "vitest";

import { POST } from "@/app/api/feature-knowledge/query/route";

const postRaw = (body: string): Promise<Response> =>
  POST(
    new Request("https://www.agentwitch.com/api/feature-knowledge/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    }),
  );

describe("POST /api/feature-knowledge/query", () => {
  it("returns 400 JSON for a malformed body instead of throwing", async () => {
    const response = await postRaw("{not json");

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "Invalid JSON body." });
  });

  it("returns 400 when the JSON body is not an object", async () => {
    const response = await postRaw("null");

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "Invalid JSON body." });
  });

  it("still requires a query", async () => {
    const response = await postRaw("{}");

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "query is required" });
  });

  it("answers a valid query from the committed index", async () => {
    const response = await postRaw(JSON.stringify({ query: "projects" }));

    expect(response.status).toBe(200);
  });
});
