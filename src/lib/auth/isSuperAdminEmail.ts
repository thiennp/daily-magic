import { SUPER_ADMIN_EMAIL } from "@/lib/auth/constants";

export default function isSuperAdminEmail(email: string): boolean {
  return email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase();
}
