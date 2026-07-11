import type { GlobalRoleValue } from "@/lib/auth/roles";

export default interface AuthActor {
  readonly id: string;
  readonly email: string;
  readonly globalRole: GlobalRoleValue;
}
