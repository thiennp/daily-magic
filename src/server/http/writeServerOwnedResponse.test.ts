import { describe, expect, it } from "vitest";

import { SECURITY_HEADERS } from "@/lib/security/securityHeaders.constant";
import { writeServerOwnedResponse } from "@/server/http/writeServerOwnedResponse";

const createFakeResponse = () => {
  const calls: string[] = [];
  const headers: Record<string, string> = {};
  const fake = {
    status: 0,
    head: {} as Record<string, string>,
    body: "",
    setHeader: (name: string, value: string) => {
      calls.push(`setHeader:${name}`);
      headers[name] = value;
    },
    writeHead: (statusCode: number, head: Record<string, string>) => {
      calls.push("writeHead");
      fake.status = statusCode;
      fake.head = head;
    },
    end: (body: string) => {
      calls.push("end");
      fake.body = body;
    },
  };
  return { fake, calls, headers };
};

describe("writeServerOwnedResponse", () => {
  it.each([
    [200, "application/json", '{"ok":true}'],
    [503, "text/plain", "Service starting"],
  ])(
    "writes %i %s with security headers set before writeHead",
    (statusCode, contentType, body) => {
      const { fake, calls, headers } = createFakeResponse();

      writeServerOwnedResponse(fake, { statusCode, contentType, body });

      expect(headers).toEqual(
        Object.fromEntries(
          SECURITY_HEADERS.map(({ key, value }) => [key, value]),
        ),
      );
      expect(calls.indexOf("writeHead")).toBe(SECURITY_HEADERS.length);
      expect(calls.at(-1)).toBe("end");
      expect(fake.status).toBe(statusCode);
      expect(fake.head).toEqual({ "Content-Type": contentType });
      expect(fake.body).toBe(body);
    },
  );
});
