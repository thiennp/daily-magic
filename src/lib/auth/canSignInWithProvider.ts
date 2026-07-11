import isSuperAdminEmail from "@/lib/auth/isSuperAdminEmail";

export default function canSignInWithProvider(
  email: string,
  provider: string,
): boolean {
  if (isSuperAdminEmail(email)) {
    return provider === "google";
  }

  return true;
}
