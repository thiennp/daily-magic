import type { GlobalRoleValue } from "@/lib/auth/roles";

export default interface UserRecord {
  readonly id: string;
  readonly email: string;
  readonly name: string | null;
  readonly image: string | null;
  readonly globalRole: GlobalRoleValue;
  readonly createdAt: string;
}
