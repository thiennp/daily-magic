import { auth } from "@/lib/auth/auth";

export type ServerSessionHint = "signed_in" | "signed_out";

export async function resolveServerSessionHint(): Promise<ServerSessionHint> {
  const session = await auth();
  return session?.user ? "signed_in" : "signed_out";
}
