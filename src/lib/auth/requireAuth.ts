import { auth } from "@/lib/auth/auth";

export async function requireAuth() {
  const session = await auth();

  if (!session?.user?.id || !session.user.email) {
    return {
      error: Response.json({ error: "Unauthorized" }, { status: 401 }),
      actor: null,
    };
  }

  return {
    error: null,
    actor: {
      id: session.user.id,
      email: session.user.email,
      globalRole: session.user.globalRole,
    },
  };
}
