import { handlers } from "@/lib/auth/auth";
import { allowMagicLinkRequest } from "@/lib/auth/magicLinkRateLimit";

export const { GET } = handlers;

export async function POST(request: Request): Promise<Response> {
  if (new URL(request.url).pathname.endsWith("/signin/resend")) {
    const form = await request
      .clone()
      .formData()
      .catch(() => null);
    const email = form?.get("email");
    if (typeof email === "string" && !allowMagicLinkRequest(email)) {
      return Response.json(
        { error: "Too many sign-in emails for this address. Try again later." },
        { status: 429 },
      );
    }
  }
  return handlers.POST(request as never);
}
